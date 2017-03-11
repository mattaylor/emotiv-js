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

```
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
		cortex.on('eegData').then(eeg => /* do something with eeg sample */)
		cortex.on('cogPerf').then(log => /* do something with cognitv metrics */)
		cortex.on('contact').then(eeg => /* do something with contact quality */)
	}
}
```


### RPC API: 

See [RPCAPI](/emotiv/cortex/wiki/rpcapi.md) for more details

__Start Session:__
```
<< { "id":1, "jsonrpc":"2.0", "method":"createSession", "params": { "subscribe":["sensor"], "_auth": "abc" } }
>> { "id":1, 
     "result":  
     { "id"   : "1234.9999"
     , "status" : "ready"
     , "created" : "2016-12-13T03:13:13.841Z"
     , "sensors": [ "af3", "af4", "af5" ]
     , "headset": "Insight-1234" } } }
     }
   }
```

__Close Session:__
```
<< { "id":1, "jsonrpc":"2.0", "method":"updateSession", "params": { "status": "closed", "_auth": "abc" } }
>> { "id":1, "result":"ok" }
```

__Subscribe:__
```
<< { "id":1, "jsonrpc":"2.0", "method":"subscribe", "params": "streams":["cogPerf","contact"], "_auth": "abc" } }
>> { "id":1, "result":"ok" }
```

__UnSubscribe:__
```
<< { "id":1, "jsonrpc":"2.0", "method":"unsubscribe", "params": "streams":["congPerf","eegData"], "_auth": "abc" } }
>> { "id":1, "result":"ok" }
```

__Authorize:__
```
<< { "id":1, "jsonrpc":"2.0", "method":"authorize", "params": { "license:"myLic1" } }
>> { "id":1, "result": {"_auth":"AWKU3flNae", "expires":"1234", "balance":10}}
```
### Messages: 
See [Event Models](/emotiv/cortex/wiki/events.md) for more details

__EegData:__
```
{ "id"  : "ABCD-9999", "time" : 1489217636863 , "eegData": [11,11,11,11,11] }
```

__CogPerf:__
```
{ "id"  : "ABCD-9999", "time" : 1489217636863 , "cogPerf": [55,55,55,55,55,55] }
```

__FacExps:__
```
{ "id"  : "ABCD-9999", "time" : 1489217636863 , "eegData": [55,55,55,55,55,55] }
```

__Commands:__
```
{ "id"  : "ABCD-9999", "time" : 1489217636863 , "command": [55,55,55,55,55,55] }
```

__Profile:__
```
{ "id"  : "ABCD-9999", "time" : 1489217636863 , "profile": [55,55,55,55,55,55] }
```


### JS Client API


__Basic Usage:__
```
var cortex = new Cortex({ host: 'localhost', port:8000, client:'myApp1', license:'myLic1'})
client.call('createSession'}).then(session => {/* do something */})
client.on('contact', event => { /* do something */} )
client.on('facExps', event => { /* do something */ })
client.on('motions', event => { /* do something */ })
client.on('eegData', event => { /* do something */ })

```
__Auto Discovery:__
```
new Cortex({client:'myApp1', license:'myLic'}, client => {
  client.api.createSession().then(session => {/* do something */})
  client.on('contact', event => { /* do something */ })
})
```

