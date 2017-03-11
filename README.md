## Emotiv Cortex JS Client and Mock Service.

ALPHA!

### Getting Started 

nodejs required

`$ npm install`
`$ npm start`

To Test from Chrome..

- Install A websocket extension like https://chrome.google.com/webstore/detail/simple-websocket-client/pfdhoblngboilpfeibdedpjgfnlcodoo?hl=en
- Connect to 'ws://localhost:4080`
- To subscribe to all metrics and sensor streams, send `{ "id":1, "method":"events.subscribe", "params": {"topic":"metrics,sensors", "token": "abc" } }`

Additional API's defined below..

### From QT/QML

```javascript
import "client.js" as Cortex

Rectangle {
	width: 360
	height: 360
	WebSocket {
		id: qSocket
		url: 'wss://localhost:8000'
	}
	property var cortex: new Cortex({appId: 'myApp1', socket:qSocket})
	Component.onCompleted: {
		cortex.createSession()
		cortex.on('eegs').then(eeg => /* do something with eeg sample */)
		cortex.on('perf').then(log => /* do something with performance metrics */)
		cortex.on('cont').then(eeg => /* do something with contact quality */)
	}
}
```


### RPC API: 

See [RPCAPI](/emotiv/cortex/wiki/rpcapi.md) for more details

__Start Session:__
```javascript
<< { "id":1, "jsonrpc":"2.0", "method":"createSession", "params": { "subscribe":["cont"], "_auth": "abc" } }
>> { "id":1, 
     "result":  
     { "id"   : "1234.9999"
     , "status" : "opened"
     , "created" : "2016-12-13T03:13:13.841Z"
     , "sensors": [ "af3", "af4", "af5" ]
     , "headset": "Insight-1234" } } }
     }
   }
```

__Close Session:__
```javascript
<< { "id":1, "jsonrpc":"2.0", "method":"updateSession", "params": { "status": "closed", "_auth": "abc" } }
>> { "id":1, "result":"ok" }
```

__Subscribe:__
```javascript
<< { "id":1, "jsonrpc":"2.0", "method":"subscribe", "params": "streams":["perf","cont"], "_auth": "abc" } }
>> { "id":1, "result":"ok" }
```

__UnSubscribe:__
```javascript
<< { "id":1, "jsonrpc":"2.0", "method":"unsubscribe", "params": "streams":["perf","eegs"], "_auth": "abc" } }
>> { "id":1, "result":"ok" }
```

__Authorize:__
```javascript
<< { "id":1, "jsonrpc":"2.0", "method":"authorize", "params": { "license:"myLic1" } }
>> { "id":1, "result": {"_auth":"AWKU3flNae", "expires":"1234", "balance":10}}
```
### Messages: 
See [Event Models](/emotiv/cortex/wiki/events.md) for more details

__EEG Samples:__
```javascript
{ "id"  : "ABCD-9999", "time" : 1489217636863 , "eegs": [11,11,11,11,11] }
```

__Performance Metrics:__
```javascript
{ "id"  : "ABCD-9999", "time" : 1489217636863 , "perf": [55,55,55,55,55,55] }
```

__Facial Expressions:__
```javascript
{ "id"  : "ABCD-9999", "time" : 1489217636863 , "face": [55,55,55,55,55,55] }
```

__Mental Commands:__
```javascript
{ "id"  : "ABCD-9999", "time" : 1489217636863 , "comm": [55,55,55,55,55,55] }
```

__Profile Training:__
```javascript
{ "id"  : "ABCD-9999", "time" : 1489217636863 , "prof": [55,55,55,55,55,55] }
```


### JS Client API


__Basic Usage:__
```javascript
var cortex = new Cortex({ host: 'localhost', port:8000, client:'myApp1', license:'myLic1'})
client.call('createSession'}).then(session => {/* do something */})
client.on('cont', event => { /* do something */} )
client.on('face', event => { /* do something */ })
client.on('gyro', event => { /* do something */ })
client.on('eegs', event => { /* do something */ })

```
__Auto Discovery:__
```javascript
new Cortex({client:'myApp1', license:'myLic'}, client => {
  client.api.createSession().then(session => {/* do something */})
  client.on('contact', event => { /* do something */ })
})
```