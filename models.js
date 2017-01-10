var fs = require('fs')
var jsf = require('json-schema-faker')
var yaml = require('js-yaml')

var load = (file) => yaml.safeLoad(fs.readFileSync(file))

var events = load('./evt_schema.yml')
var models = load('./res_schema.yml')
var schema = {}

var fixit = s => {
  s.required = Object.keys(s.properties)
  if (s.definitions) schema = Object.assign(schema, s.definitions)
  if (!s.properties.type) s.properties.type = { pattern: s.title } 
  if (s.properties.time) s.properties.time.format = "iso" 
  s.interval = 1000
  return s
}

events.map(s => schema[s.title.toLowerCase()] = fixit(s))
models.map(s => schema[s.title.toLowerCase()] = fixit(s))
console.log(schema)

schema.auth = {
  required: ['_auth', 'scope', 'debit', 'emoId', 'expires'],
  properties: {
    _auth: { pattern: '[A-Za-z0-9]{10}' },
    emoId: { pattern: 'emo:[A-Za-z0-9]{10}' },
    debit: { type: 'integer', minimum: 0, maximum: 100 },
    scope: { enum: ['basic', 'extra', 'prime'] },
    expires: { type: 'string', format: 'iso' }
  }
}

var sample = {}

jsf.format('iso', (gen, schema) => new Date().toISOString())
jsf.format('emo', (gen, schema) => 'emo:1234')
jsf.format('ses', (gen, schema) => 'ses:1234.' + new Date().getTime())

Object.keys(schema).forEach(type => { sample[type] = jsf(schema[type], schema) })

console.log(sample)

module.exports = {
  schema: schema,
  events: events,
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

