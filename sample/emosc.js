// An OSC / Cortex Proxy
// OSC Routes are mapped to cortex streams as follows..
// Device Streams:
// 	dev/af3 	-> Contact Quality for af3 channel
// 	dev/bat 	-> Batery 
// Motion Streams
// 	mot/gyrox 	-> 
// 	mot/gyroY	-> 
// 	mot/gyroZ
// 	mot/accX
// BandPowers
// 	pow/alpha
// 	pow/betaH
// 	pow/betaL
// Raw EEG 
// 	eeg/{channel}
// Cognitive Affective 
// 	cog/fru
// 	cog/exc
var OSC = require('osc')
var WebSocket = require("ws");
var Cortex = require('../client.js')
var creds = { 
  username: "cortextest",
  password: "Zxcvbnm1",
  socket: new WebSocket('ws://localhost:54321'),
  client_id: "dLtw8yCxBXdIqdlDKHmhB2Sx5gI91amybjUGnaJx",
  client_secret:"Bg84uRfKi4k58tYxkUS0fGpEvrANaYrvQ6CwNwXyRnvWtUTxagerHUW47LxWdWvSlSlGlt6cMdrGL8Pi6iSQwYXrpcTxXE2x0BHDTsYbZjn6iYVqF0Mu0XptfEY5zgjo",
  debit: 100
}
//var oscHost = '192.168.86.42'
var oscHost = '192.168.1.20'
var oscPort = 57121
//var oscPort = 8080
//var oscHost = 'localhost'
var emo = new Cortex(creds).newSession({ project:'OSC', status:'active' })
//var oscPort = new OSC.WebSocketPort({ url: `ws://${oscHost}:{oscPort}`, unpackSingleArgs: false, metadata: true })
var oscPort = new OSC.UDPPort({ localAddress:oscHost, localPort:oscPort, broadcast:true, metadata: true })
//var streams = ['dev', 'mot', 'cog', 'pow', 'eeg']
oscPort.open()
var streams = ['cog']
console.log('starting..')

var sendOsc_ = (str, evt) => Object.keys(evt[str]).map(key => osc.send({
   address:`/emotiv/${str}/${key}`, 
   args:[ { type:'f', value: evt[str][key] } ]
}))

var sendOsc = (str, evt) => oscPort.send({
  timeTag: new Date().getTime(),
  packets: Object.keys(evt[str]).map(key => ({ 
    address:`/emotiv/${str}/${key}`, 
    args:[ { type:'f', value: evt[str][key] } ]
  }, oscHost, oscPort))
})

oscPort.on('ready', () => {
  console.log('OSC READY')
  streams.map(str => emo.on(str, evt => sendOsc(str, evt)))
})

/*
osc.on("bundle", function (oscBundle, timeTag, info) {
    console.log("An OSC bundle just arrived for time tag", timeTag, ":", oscBundle);
    console.log("Remote info is: ", info);
});
*/
/*
var osc = require("osc")
var http = require("http") 
var WebSocket = require("ws")
var app = require("express")()
var server = app.listen(8081)
var wss = new WebSocket.Server({ server: server })
wss.on("connection", socket => { 
    var port = new osc.WebSocketPort({ socket: socket, metadata: true })
    port.on("message", oscMsg => console.log("An OSC Message was received!", oscMsg))
})
*/