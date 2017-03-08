version = require('./package.json').version
fs = require 'fs'
path = require 'path'
yaml = require 'js-yaml'
debug = require 'debug'
jmes = require 'jmespath'
Mustache = require 'mustache'
extend = require('util')._extend
_ = require 'lodash'

String.prototype.ucfirst = () ->
  @charAt(0).toUpperCase() + @substr(1)

class Generator
  
  constructor: () ->
    @debug = debug 'generator'

  render: (recipe) ->
    @debug 'Traversing schemas ..'
    @root = {}
    data  =
      name: recipe.name || 'My project'
      desc: recipe.desc 
      schemas: []
    for item in recipe.schemas
      @debug 'Found schema: %s', item.src
      schemas = @getJSON(item.src)
      if !schema instanceof Array then schemas = [schemas]
      for schema in schemas
        @root[schema.id || schema.title.toLowerCase()] = schema 
        if item.example then schema.example = @getJSON(item.example)[schema.title]
        schema.title = schema.title.ucfirst()
        rSchema = @renderSchema(schema)
        data.schemas.push
          title: schema.title || schema.id
          rendered: rSchema.rendered
    
    return @renderTpl 'collection.md', data

  resolveRef: (root, obj) ->
    ##root = @root
    obj.typeKey = obj.key
    if obj.$ref
      #console.log obj.$ref
      trimed = obj.$ref.replace(/^#\//, '').replace(/\//g, '.').toLowerCase()
      #console.log('trimed:', trimed)
      res = _.clone(jmes.search(root.definitions, trimed))
      if not res
        console.log 'Bad reference: '+obj.$ref
        obj.type = "Object [#{trimed}](##{trimed})"
        return obj
        #process.exit 1
      if typeof(res) == 'object'
        res.typeKey = trimed.match(/\.?([^\.]+)$/)[1]
        if res.description and obj.description
          res.description = obj.description+' '+res.description
        if res.title and obj.title
          res.title = obj.title
        obj = extend(obj, res)
      else
        obj = res
        
    return obj

  renderObject: (root, obj, subs, name, pth) ->
    obj = @resolveRef root, obj
    if obj.key != obj.typeKey
      name = name.replace(/[^\.]+$/, obj.typeKey)

    subs  = subs || []
    enums = []
    name  = name || ""
    props = []

    for key, prop of obj.properties
      prop.key = key
      prop = @resolveRef root, prop
      key = prop.key
      typeKey = prop.typeKey
      console.log prop
      data =
        key: key
        title: prop.title?.ucfirst()
        type: prop.type?.ucfirst()  || 'string'
        description: prop.notes || prop.title
        example: prop.example
        pattern: prop.pattern

      if prop.format then data.type += ' ('+prop.format+')'
      if prop.enum then data.pattern = ' '+prop.enum.join('|')      
        
      if prop.description
        data.description = prop.title+' - '+prop.description

      if root.example
        query = if pth then pth+'.'+key else key
        @debug(obj.title || name, 'search example path: '+query)
        data.example = JSON.stringify(jmes.search(root.example, query))

      if prop.oneOf
        types = []
        for variant in prop.oneOf
          variant = @resolveRef root, variant
          if variant.type == 'object'
            rendered = @renderObject(root, variant, null, name+'.'+key, key)
            types.push rendered
            subs.push rendered
            subs = subs.concat rendered.subs
          else
            types.push { type: variant.type?.ucfirst() || variant.type }
        data.type = types.map((x) -> x.type).join(' or ')

      rKey = (if name!="" then name+'.'+typeKey else typeKey)
      switch prop.type
        when 'object'
          rr = @renderObject(root, prop, null, rKey, key)
          subs.push rr
          subs = subs.concat rr.subs
          data.type = "Object [#{rKey}](##{rKey})"
        when 'array'
          rr = @renderObject(root, prop.items, null, rKey, key+'[0]')
          if prop.items.type == 'object'
            subs.push rr
            subs = subs.concat rr.subs
          data.type = "Array \["+rr.type+"\]"
        when 'string'
          if prop.enum
            enums.push
              enumKey: key
              values: prop.enum.map (x) -> { val: x }
      props.push data

    rendered = @renderTpl 'object.md',
      props: props
      desc: obj.description

    type = if obj.type == 'object'
      "Object [#{name}](##{name})"
    else
      obj.type

    output =
      rendered: rendered
      desc: obj.description
      type: type
      subs: subs
      enums: enums
      name: name

    if obj.type == 'object'
      example = if pth then jmes.search(root.example, pth) else root.example
      output.example = JSON.stringify(example, null, 2)

    return output

  renderSchema: (schema) ->

    main = @renderObject(schema, schema, null, schema.title)
    data =
      title: schema.title
      main: main.rendered
      subs: _.uniq(main.subs, 'name')
      mainExample: JSON.stringify(schema.example, null, 2)
      schemaDesc: schema.description

    return { rendered: @renderTpl('schema.md', data), data: data }

  renderTpl: (name, data) ->
    tpl = path.join(__dirname, 'templates', name)
    return Mustache.render(fs.readFileSync(tpl).toString(), data)

  getJSON: (fn) ->
    f = fs.readFileSync(fn)
    return if fn.match /\.ya?ml$/ then yaml.safeLoad(f) else JSON.parse(f) 

class CLI

  constructor: ->
    @defaultFile = 'schema-doc.yaml'
    @defaultOutput = 'output.md'
    @program = require 'commander'
    @debug = (msg) -> null
    @program
      .option "-r, --recipe <file>", "Recipe file (default: #{@defaultFile})",
        @defaultFile
      .option "-o, --output <file>", "Output file (default: #{@defaultOutput})",
        @defaultOutput
      .option "-p, --print", "Print result to stdout"
      .option "-v, --verbose", "Verbose", ((v, t) -> t+1), 0
      .version version

  error: (msg) ->
    process.stderr.write msg
    process.exit 1

  start: ->
    # parse arguments
    @program.parse(process.argv)

    # process options
    if @program.verbose
      debug.enable "*"
      @debug = debug 'cli'

    if @program.args.length then console.log @program.args

    # load config file
    recipe = @loadRecipe @program.recipe
    
    generator = new Generator
    output = generator.render(recipe)

    if @program.print
      process.stdout.write output
    else
      fileOutput = @program.output
      process.stdout.write 'Writing to file: '+fileOutput
      fs.writeFileSync(fileOutput, output)

  loadRecipe: (fn) ->
    @debug 'Loading recipe: '+fn
    if not fs.existsSync(fn)
      return @error 'Recipe not exists: '+fn
    return yaml.load(fs.readFileSync(fn))

module.exports =
  cli: CLI
  generator: Generator
  startCLI: -> new CLI().start()

