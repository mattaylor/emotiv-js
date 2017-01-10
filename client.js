/* Cortex WebRTC Client */
class Cortex {

  constructor (opts = {}, next) {
    Object.assign(this, { opts:opts, api:{}, _rpc:{}, _evt:{}, queue:[]})
    this.sock = new WebSocket('ws://'+(opts.host||'localhost')+':'+(opts.port||8000))
    this.sock.onopen = () => this.queue.map(_ => this.sock.send(JSON.stringify(this.queue.shift())))
    if (opts.appId) this.auth(opts)
    this.sock.onmessage = msg => {
      var data = JSON.parse(msg.data)
      if (data.methods) return this.init(data.methods, next)
      var type = (data.type || data._id || data.id).substring(0, 3)
      if (!data.jsonrpc) return this._evt[type] && this._evt[type](data)
      console.log('RESPONSE:', data)
      if (!this._rpc[data.id]) throw('Invalid Response: '+data)
      if (data.error && this._rpc[data.id].err) this._rpc[data.id].err(data.error)
      else this._rpc[data.id].res(data.result, data.error)
      delete this._rpc[data.id]
    }
  }

  /* Send authorization request and set this.creds as a promise to resolve to tokens  */
  auth (args = this.opts) {
    return this.creds = this.call('authorize', args).then(res => this.creds = res) 
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
  on (event, cb) {
    var evt = event.substring(0,3)
    if (this.creds && !this._evt[evt]) this.call('subscribe', {events: [event]})
    if (cb) this._evt[evt] = cb
    else return new Promise(resolve => { this._evt[evt] = resolve })
  }

  /* remove callbacks for event handlers and unsubscribe from service */
  off (event) {
    var evt = event.substring(0,3)
    if (!this._evt[evt]) return
    if (this.creds) this.call('unsubscribe', {events: [event]})
    delete this._evt[evt]
  }
}

if (typeof module == 'object') module.exports = Cortex

