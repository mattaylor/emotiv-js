/* Cortex WebRTC Client */
class Cortex {

  constructor (opts = {}, next) {
    Object.assign(this, { opts:opts, api:{}, _rpc:{}, _sub:{}, queue:[]})
    if (opts.socket) this.sock = polySocket(opts.socket)
    else this.sock = new WebSocket('ws://'+(opts.host||'localhost')+':'+(opts.port||8000))
    this.sock.onopen = () => this.queue.map(_ => this.sock.send(JSON.stringify(this.queue.shift())))
    if (opts.client) this.auth(opts)
    this.sock.onmessage = msg => {
      var data = JSON.parse(msg.data)
      console.log('MESSAGE:', data)
      if (data.methods) return this.init(data.methods, next)
      if (data.sid) return Object.keys(this._sub).map(key => data[key] && this._sub[key].map(cb => cb(data)))
      if (!this._rpc[data.id]) throw('Invalid Response: '+data)
      if (data.error && this._rpc[data.id].err) this._rpc[data.id].err(data.error)
      else this._rpc[data.id].res(data.result, data.error)
      delete this._rpc[data.id]
    }
  }

  /* Send authorization request and set this.creds as a promise to resolve to tokens  */
  auth (args = this.opts) {
    console.log('auth:', args)
    return this.call('authorize', args).then(res => this.creds = res) 
    //return this.creds = this.call('authorize', args) 
   }

  /* Implement supported rpc api's from server discovery */
  init (api, next) {
    api.map(meth => { this.api[meth] = (args, cb) => this.call(meth, args, cb) })
    return next ? next(this) : true
  }

  /* Send RPC request and set callback or return a promise*/
  call (meth, args = {}, cb) {
    if (this.creds && this.creds._auth) args._auth = this.creds._auth
    else if (this.creds) return this.creds.then(_ => this.call(meth, args, cb)) 
    var req = { id: new Date().getTime(), type: 'request', jsonrpc: '2.0', method: meth, params: args }
    console.log('REQUEST:', req)
    this.sock.readyState ? this.sock.send(JSON.stringify(req)) : this.queue.push(req)
    if (cb) this._rpc[req.id] = { res: cb }
    else return new Promise((resolve, reject) => { this._rpc[req.id] = { res: resolve, err: reject } })
  }

  /* set callbacks for event handlers and auto subscribe to service if necessary*/
  on (stream, cb) {
    var stream = stream.substring(0,3)
    if (this.creds && !this._sub[stream]) this.call('subscribe', {streams: [stream]})
    if (!this._sub[stream]) this._sub[stream] = []
    if (cb) this._sub[stream].push(cb)
    else return new Promise(resolve => { this._sub[stream].push(resolve) })
  }

  /* remove callbacks for event handlers and unsubscribe from service */
  off (stream) {
    var stream = stream.substring(0,3)
    if (!this._sub[stream]) return
    if (this.creds) this.call('unsubscribe', {streams: [stream]})
    delete this._sub[stream]
  }
}

//Polyfill W3C WebSocket from QML WebSocket
function wSocket(qSocket) {
  qSocket.onMessageReceived = function(message) { if (this.onmessage) this.onmessage(message) }
  qSocket.onStatusChanged   = function(status) {
    if (status == 'error' && this.onerror) return this.onerror()
    if (status == 'close' && this.onclose) return this.onclose()
    if (status == 'open'  && this.onopen)  {
      this.readyState = true 
      return this.onopen()
    } 
  }
  qSocket.send = qSocket.sendMessage
  return qSocket
}

//Polyfill QML WebSocket from W3C WebSocket
function qSocket(wSocket) {
  wSocket.onmessage = function(message) { if (this.onMessageReceived) this.onMessageRecieved(message) }
  wSocket.onerror   = function() { if (this.onStatusChanged) this.onStatusChanged('error') }
  wSocket.onclose   = function() { if (this.onStatusChanged) this.onStatusChanged('close') }
  wSocket.onopen    = function() { if (this.onStatusChanged) this.onStatusChanged('close') }
  wSocket.sendMessage = w3socket.send
  return wSocket
}

//Polyfill QML and W3C WebSockets automatically
function polySocket(socket) {
  if (socket.sendMessage) return qSocket(socket)  //socket is QT WebSocket
  if (socket.send) return wSocket(socket)  //socket is W3C WebSocket
}

if (typeof module == 'object') module.exports = Cortex
