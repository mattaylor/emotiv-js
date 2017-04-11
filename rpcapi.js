var models = require('./models')

var clients = {}
var streams = {}
var session = { sample : models.sample.Session }
var latest  = {}
var message = {}

var rpc = {

  subscribe: (args={}, client) => {
    verify(args, ['_auth', 'streams'])
    if (typeof args.streams === 'string') args.streams = args.streams.split(',')
    let sid = args.session || latest
    let spec = {} 
    if (!session[sid] || session[sid].status == 'closed') throw('Invalid Session')
    if (!clients[sid]) clients[sid] = {}
    args.streams.map(stream => {
      console.log('subscribing to :', stream)
      if (!clients[sid][stream]) clients[sid][stream] = {}
      clients[sid][stream][args._auth] = client
      console.log('sub clients:', Object.keys(clients[sid][stream]))
      spec[stream] = session[sid].streams[stream]
    })
    return { sid: sid, streams: spec }
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
    let ses = { 
      id: sid, 
      created: new Date().toISOString(), 
      markers:[], 
      status: args.status || 'active', 
      streams: models.sample.Session.streams
    }
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
      if (ses.streams[stream].freq) {
        streams[sid].push(setInterval(_ => notify(random(stream, sid)), 1000/ses.streams[stream].freq))
      }
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
  queryProfiles : (args) => [ models.getDoc('profile') ],
  
  injectMarker : (args) => {
    verify(args, ['label', '_auth']) 
    var ses = args.session ?  session[args.session] : session[latest]
    if (!ses) throw ('invalid session id')
    if (ses.status == 'closed') throw ('Session Closed')
    var mark = { label:args.label, enums:[], events:[] }
    var mInd = ses.markers ? ses.markers.findIndex(_ => _.label == args.label) + 1 : 0
    if (mInd) mark = ses.markers[mInd-1] 
    else if (ses.markers) ses.markers.push(mark)
    else ses.markers = [mark]
    var mVal = parseInt(args.value) || 0
    if (!mVal && typeof args.value === 'string') {
      if (!mark.enums) mark.enums = [] 
      mVal = (mark.enums.findIndex(_ => _ == mVal) + 1) || mark.enums.push(args.value)
    }
    if (!mark.events) mark.events = []
    mark.events.push([args.time || new Date().getTime(), mVal])
    return ses
  }
}

var random = (stream, sid) => {
  let msg = { sid: sid, time: new Date().getTime() }
  if (!message[sid]) message[sid] = {}
  var last = message[sid][stream]
  var spec = session[sid].streams[stream]
  let next = [] 
  if (spec.enums) {
    let n  = spec.cols.length
    while(n--) next.push(Math.round(Math.random() * spec.enums.length))
  } else if (last) {
    next = last.map((val, i) => Math.abs(Math.round((val + (Math.random() - 0.5)*50 ) * 100)  / 100))
  } else { 
    let n  = spec.cols.length
    while(n--) next.push(Math.round(Math.random() * 100))
  }
  message[sid][stream] = next
  //console.log(stream, next)
  msg[stream] = next 
  return msg
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
