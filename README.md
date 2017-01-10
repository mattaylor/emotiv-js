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

### RPC API: 

See [RPCAPI](/emotiv/cortex/wiki/rpcapi.md) for more details

__Start Session:__
```
<< { "id":1, "jsonrpc":"2.0", "method":"createSession", "params": { "events":["sensor"], "_auth": "abc" } }
>> { "id":1, 
     "result":  
     { "id"   : "ses:1234.9999"
     , "emoId": "emo:1234"
     , "type" : "session"
     , "time" : "2016-12-13T03:13:13.841Z"
     , "sensors": [ "af3", "af4", "af5" ]
     , "proId": "pro:1234", 
     , "headset": { "name": "myInsight", "version": "INSIGHT", "id":"INSIGHT-1234", "firmware": "v1.2" } } }
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
<< { "id":1, "jsonrpc":"2.0", "method":"subscribe", "params": "events":["metrics","sensors"], "_auth": "abc" } }
>> { "id":1, "result":"ok" }
```

__UnSubscribe:__
```
<< { "id":1, "jsonrpc":"2.0", "method":"unsubscribe", "params": "events":["metrics","sensors"], "_auth": "abc" } }
>> { "id":1, "result":"ok" }
```

__Authorize:__
```
<< { "id":1, "jsonrpc":"2.0", "method":"authorize", "params": { "appId": "myApp1", "licId:"myLic1" } }
>> { "id":1, "result": {"_auth":"AWKU3flNae", "emoId":"1234", "debit""expires":}}
```

### Events: 

See [Event Models](/emotiv/cortex/wiki/events.md) for more details

__Sensors:__
```
{ "_id"  : "sen:1234.9999+10",
, "imp" : [11,11,11,11,11],
, "bat" : 88
}
```

__Metrics:__
```
{ "_id" : "met:1234.9999+10"
, "foc":58
, "int":2
, "med":96
}
```

__Facials:__
```
{ "_id":"fac:1234.9999+10"
, "uAct": "frown"
, "lAct": "smile"
, "uPow": 77
, "lPow": 44
, "eyes": "lookR"
}
```


### JS Client API


__Basic Usage:__
```
var client = new Cortex({ host: 'localhost', port:8080, appId:'myApp1', licId:'myLic1'})
client.call('createSession'}).then(session => {/* do something */})
client.on('sensors', event => { /* do something */} )
client.on('facials', event => { /* do something */ })
client.on('motions', event => { /* do something */ })
client.on('command', event => { /* do something */ })

```
__Auto Discovery:__
```
new Cortex({appId:'myApp', licId:'myLic'}, client => {
  client.api.createSession().then(session => {/* do something */})
  client.on('sensors', event => { /* do something */ })
})
```

