var models = require('./models')

var clients = {}
var streams = {}
var session = {}
var latest  = {}
var message = {}

var rpc = {

  subscribe: (args={}, client) => {
    verify(args, ['_auth', 'streams'])
    if (typeof args.streams === 'string') args.streams = args.streams.split(',')
    let sid = args.session || latest 
    if (!session[sid] || session[sid].status == 'closed') throw('Invalid Session')
    if (!clients[sid]) clients[sid] = {}
    args.streams.map(stream => {
      console.log('subscribing to :', stream)
      if (!clients[sid][stream]) clients[sid][stream] = {}
      clients[sid][stream][args._auth] = client
      console.log('sub clients:', Object.keys(clients[sid][stream]))
    }) 
    return { sid: sid }
  },

  unsubscribe: (args={}, client) => {
    verify(args, ['_auth', 'streams'])
    let sid = args.session || latest
    if (typeof args.streams === 'string') args.streams = args.streams.split(',')
    args.streams.map(stream => { delete clients[sid][stream][args._auth] })
    return 'ok'
  },

  createSession: (args={}, client) => {
    verify(args, ['_auth'])
    let sid = latest = new Date().getTime()
    let ses = { id: sid,created: new Date().toISOString(),  status: args.status || 'active', streams: models.sample.Session.streams}
    ses = models.genDoc('session', ses)
    if (ses.status == 'active') ses.started =  ses.created
    ses.stopped = null
    session[sid] = ses
    console.log(ses)
    if (!args.subscribe) args.subscribe = ['ses'] 
    else args.subscribe.push('ses')
    rpc.subscribe({_auth:args._auth, session:sid, streams:args.subscribe}, client)
    streams[sid] = []
    Object.keys(ses.streams).map(stream  => {
      if (ses.streams[stream].freq) streams[sid].push(setInterval(_ => notify(random(stream, sid)), 1000/ses.streams[stream].freq))
    })
    return ses
  },


  updateSession: (args={}, client) => {
    verify(args, ['_auth'])
    let sid = args.session || latest
    if (!session[sid]) throw ('Invalid Session')
    session[sid] = Object.assign(session[sid], args)
    if (args.status) notify({sid:sid, ses:[args.status]})
    if (session[sid].status ==  'closed') { 
      session[sid].stopped =  new Date().toISOString()
      delete clients[sid]
      streams[sid].map(clearInterval)
    }
    return session[sid]
  },

  createMarker: (args={}, client) => verify(args, ['id', 'note', 'time']) ? 'ok' : null,
  authorize : (args, client) => verify(args, ['client']) ? models.genDoc('authresponse', args) : null,
  createSubject : (args, client) => verify(args, ['_auth']) ? models.genDoc('subject', args) : null,
  queryHeadsets : (args) => [ models.genDoc('headset') ],
  querySessions : (args) => Object.keys(session).map(sid => session[sid]),
  querySubjects : (args) => [ models.getDoc('subject') ],
  queryProfiles : (args) => [ models.getDoc('profile') ]
}

var random = (stream, sid) => {
  let next = { sid: sid, time: new Date().getTime() }
  if (!message[sid]) message[sid] = {}
  let last = message[sid][stream]
  next[stream] = [] 
  if (last) {
    next[stream] = last.data = last.data.map((val, i) => 
      val -= Math.round((Math.random() - 0.5)*50 + ((val - last.init[i]) * 0.01)))
  } else {
    let n  = session[sid].streams[stream].cols.length
    while(n--) next[stream].push(Math.round(Math.random() * 1000))
    message[sid][stream] = { data: next[stream], init: next[stream] }
  }
  return next
}

var notify = (message) => {
  if (!message.time) message.time =  new Date().getTime()
  if (!message.sid) message.sid = latest
  let sid = message.sid
  if (clients[sid]) Object.keys(clients[sid]).map(stream => {
    if (message[stream] && clients[sid][stream]) Object.keys(clients[sid][stream]).map(token => {
      try {
        clients[sid][stream][token].send(JSON.stringify(message))
      } catch (err) {
        console.log(err)
      }
    })
  })
}

var verify = (ob, keys) => {
  var err = []
  keys.map(k => { if  (!ob[k]) err.push('Missing ' + k) })
  if (err.length) throw err
  return true
}

module.exports = rpc
