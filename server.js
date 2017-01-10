var server = require('http').createServer()
var url = require('url')
var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ server: server })
var express = require('express')
var app = express()
var port = 8000
var rpc  = require('./rpcapi')

app.use((req, res) => {
  res.send({ msg: 'hello' })
})

wss.on('connection', ws => {
  console.log('location:', url.parse(ws.upgradeReq.url, true))
  ws.send(JSON.stringify({ methods: Object.keys(rpc) }))
  ws.on('message', (req, res = {}) => {
    try {
      req = JSON.parse(req)
      console.log('REQUEST:', req)
      res = { id: req.id, type: 'response', jsonrpc: req.jsonrpc || '2.0' }
      if (!rpc[req.method]) console.log('UnHandled:', req)
      else res.result = rpc[req.method](req.params, ws)
    } catch (err) {
      res.error = err
      console.log(err)
    }
    console.log('RESPONSE:', res)
    if (res.id) ws.send(JSON.stringify(res))
  })
})

server.on('request', app)

server.listen(port, () => console.log('Listening on ' + server.address().port))
