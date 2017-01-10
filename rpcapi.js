var models = require('./models')

var clients = {}
var streams = []
var session = {}

var rpc = {

  subscribe: (args, client) => {
    verify(args, ['_auth', 'events'])
    if (typeof args.events === 'string') args.events = args.events.split(',')
    args.events.map(event => {
      console.log('subscribing to :', event)
      if (!clients[event]) clients[event] = {}
      clients[event][args._auth] = client
    })
    return 'ok'
  },

  unsubscribe: (args, client) => {
    verify(args, ['_auth', 'events'])
    if (typeof args.events === 'string') args.events = args.events.split(',')
    args.events.map(event => { delete clients[event][args._auth] })
    return 'ok'
  },

  createSession: (args, client) => {
    verify(args, ['_auth'])
    session = models.genDoc('session', {id: 'ses:1234.' + new Date().getTime(), status: 'active'})
    if (args.events) rpc.subscribe(args, client)
    models.events.map(event => streams.push(setInterval(_ => notify(event.id), models.schema[event.id].interval)))
    return session
  },

  updateSession: (args, client) => {
    verify(args, ['_auth'])
    session.status = args.status
    if (session.status != 'closed') return session
    if (args.events) rpc.unsubscribe(args, client)
    streams.map(clearInterval)
    streams = []
    return session
  },

  createMarker: (args, client) => verify(args, ['id', 'note', 'time']) ? 'ok' : null,
  authorize : (args, client) => verify(args, ['appId']) ? models.genDoc('auth', args) : null,
  userInfo : (args, client) => verify(args, ['_auth']) ? models.genDoc('emouser', args) : null,
  listHeadset : (args) => models.genDoc('headset'),
  pairHeadset: (args) => models.genDoc('headset'),
  connectHeadset: (args) => models.genDoc('headset')
}

var notify = (event, doc) => {
  if (!models.schema[event]) return
  var id = session._id.replace(/^\w{3}/, event.substring(0, 3)) + '+' + (new Date() - new Date(session.time))
  if (!doc) doc = models.genDoc(event, { _id: id })
  if (!clients[event]) return
  Object.keys(clients[event]).map(token => {
    try {
      clients[event][token].send(JSON.stringify(doc))
    } catch (err) {
      delete clients[event][token]
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
