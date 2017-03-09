var req = require('require-yml')
var api = req('./schema.yml')
var stm = require("json-schema-to-markdown-table")

console.log(api)

api.map(_ => console.log(stm(_)))

