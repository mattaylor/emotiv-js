var fs =   require('fs')
var jsf =  require('json-schema-faker')
var yaml = require('js-yaml')
var req =  require('require-yml')

var models = req('./schema.yml')

console.log(models)

var fixit = s => {
  console.log(s)
  s.required = Object.keys(s.properties)
  if (s.definitions) schema = Object.assign(schema, s.definitions)
  if (!s.properties.type) s.properties.type = { pattern: s.title } 
  if (s.properties.time) s.properties.time.format = "iso" 
  s.interval = 1000
  return s
}

var schema = {}
var sample = {}

models.map(s => schema[s.title.toLowerCase()] = fixit(s))

console.log(schema)


jsf.format('iso', (gen, schema) => new Date().toISOString())
jsf.format('sub', (gen, schema) => '1234')
jsf.format('ses', (gen, schema) => '1234.' + new Date().getTime())
jsf.format('word',(gen, schema) => '1234.' + new Date().getTime())

Object.keys(schema).forEach(type => { sample[type] = jsf(schema[type], schema) })
//var sample = jsf(schema.profile)

console.log(sample)

module.exports = {
  schema: schema,
  sample: sample,
  genDoc: (type, defs = {}) => Object.assign(jsf(schema[type], schema), defs),
  dbList: (type, opts = { length: 10 }) => {
    var res = { offset: 0, row: [] }
    for (let i = 0; i < opts.length; i++) {
      var doc = module.exports.genDoc(type, opts.defs)
      res.row.push({id: doc.id, key: doc.id, value: doc})
    }
    return res
  }
}

