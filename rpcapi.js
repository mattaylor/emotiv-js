var models = require('./models')

var clients = {}
var streams = {}
var session = {}
var current = {}
var message = {}

var rpc = {

  subscribe: (args, client) => {
    verify(args, ['_auth', 'streams'])
    if (typeof args.streams === 'string') args.streams = args.streams.split(',')
    let sid = session[session] || current 
    if (!session[sid] || session[sid].status == 'closed') throw('Invalid Session')
    if (!clients[session]) clients[session] = {}
    args.streams.map(stream => {
      console.log('subscribing to :', stream)
      if (!clients[sid][stream]) clients[sid][stream] = {}
      clients[sid][stream][args._auth] = client
      //res[stream] = models[stream].labels
    })
    return 'ok'
  },

  unsubscribe: (args, client) => {
    verify(args, ['_auth', 'streams'])
    let sid = args.session || current
    if (typeof args.streams === 'string') args.streams = args.streams.split(',')
    args.streams.map(stream => { delete clients[sid][stream][args._auth] })
    return 'ok'
  },

  createSession: (args, client) => {
    verify(args, ['_auth'])
    let sid = current = new Date().getTime()
    session[sid] = models.genDoc('session', {id: sid, status: args.status || 'active'})
    if (args.streams) {
      rpc.subscribe(args, client)
      streams[sid] = []
      args.streams.map(stream  => streams[sid].push(setInterval(_ => notify(stream, sid), 1000/session[sid].streams[stream].freq)))
    }
    return session[sid]
  },

  updateSession: (args, client) => {
    verify(args, ['_auth'])
    let sid = args.session || current
    if (!session[sid]) throw ('Invalid Session')
    session[sid] = Object.assign(session[sid], args)
    if (session.status != 'closed') return  session
    delete clients[sid]
    streams[sid].map(clearInterval)
  },

  createMarker: (args, client) => verify(args, ['id', 'note', 'time']) ? 'ok' : null,
  authorize : (args, client) => verify(args, ['appId']) ? models.genDoc('authorize', args) : null,
  createSubject : (args, client) => verify(args, ['_auth']) ? models.genDoc('subject', args) : null,
  queryHeadsets : (args) => models.genDoc('headset'),
}

var notify = (stream, sid) => {
  if (!clients[sid][stream]) return
  if (!models.schema[event]) return
  let next = { id: sid.replace(/^\w{3}/,stream), time: new Date().getTime(),  data: [] }
  let last = message[sid][stream] 
  if (last) {
    next.data = last.data = last.data.map((val, i) => val -= ((Math.random() - 0.5)*(10+i*2)) + ((val - last.init[i]) * 0.001 * (i+1)))
    last.data = next.data
  } else {
    let  n = 15
    while(n--) next.data.push(Math.random() * 1000)
    message[sid][stream] = { data: next.data, init: next.data }
  }
  Object.keys(clients[sid][stream]).map(token => {
    try {
      clients[sid][stream][token].send(JSON.stringify(doc))
    } catch (err) {
      delete clients[sid][stream][event][token]
    }
  })
}

var verify = (ob, keys) => {
  var err = []
  keys.map(k => { if (!ob[k]) err.push('Missing ' + k) })
  if (err.length) throw err
  return true
}

module.exports = rpc
