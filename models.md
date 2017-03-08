## __Cortex API Models__
---

[TOC]
---



---
## Headset

An EEG Headset



Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**id** | *string* | BT serial id | `"INSIGHT-1234"`
**type** | *string* |  | `"headset"`
**label** | *String* | user supplied headset name | `null`
**iface** | *string* |  | `null`
**dongle** | *string* | Dongle serial Id | `null`
**status** | *string* |  | `"connected"`
**serial** | *String* |  | `null`
**hardware** | *String* | Hardware version | `null`
**firmware** | *string* | Firmware version | `"v1.23"`
**sensors** | *Array [undefined]* |  | `["AF3","AF4","AF5","EE1","EE2"]`
**settings** | *Object [Headset.settings](#Headset.settings)* |  | `{"eegRate":33,"eegRes":55,"memsRate":55,"memsRes":55}`

__Example:__
```json
{
  "id": "INSIGHT-1234",
  "type": "headset",
  "name": "My INSIGHT",
  "status": "connected",
  "version": "INSIGHT.v1",
  "sensors": [
    "AF3",
    "AF4",
    "AF5",
    "EE1",
    "EE2"
  ],
  "settings": {
    "eegRate": 33,
    "eegRes": 55,
    "memsRate": 55,
    "memsRes": 55
  },
  "firmware": "v1.23"
}
```

### Headset.settings

Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**mode** | *string* |  | `null`
**eegRate** | *string* |  | `33`
**eegRes** | *string* |  | `55`
**memsRate** | *string* |  | `55`
**memsRes** | *string* |  | `55`



---
## Session

Represents an continuous period of eeg related activity using an emotive headset.




Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**id** | *string* | Session GUID | `"ses:ABCD-1234-ABCD-1234"`
**type** | *string* |  | `null`
**label** | *String* |  | `null`
**subject** | *string* | Emotiv Subject Id | `"sub:1234/1"`
**license** | *string* | License used to create session | `"lic:1234"`
**profile** | *string* | Profile used for commands &#x2F; facials detections | `"pro:1234/1"`
**headset** | *String* |  | `"INSIGHT-1234"`
**client** | *string* | Client Application Identifier | `"myEmotiv"`
**connected** | *String (date-time)* | Session start time | `"2016-12-15T03:37:58.064Z"`
**activated** | *String (date-time)* | Session activation time | `"2016-12-15T03:37:58.064Z"`
**completed** | *String (date-time)* | Session completion time | `null`
**duration** | *Number* | Length in seconds | `null`
**markers** | *Array [string]* | Labels for Event Markers | `["moving","paused"]`
**streams** | *Object [Session.streams](#Session.streams)* |  | `{"eeg":["AF3","AF4","AF5","EE1","EE2"],"con":["AF3","AF4","AF5","EE1","EE2"],"cog":["int","med","foc","fru","exc","eng","lex"],"bat":["headset","device"],"pow":["alpha","beta","gamma","thetaH","thetaL"],"fac":["smile","laugh","clench","frown","suprise","blink","smirk_RL","look_RL","look_UD","wink_RL"],"gps":["lat","lon"]}`
**config** | *Object [Session.config](#Session.config)* |  | `null`
**status** | *string* | Error if session less than 1 minute | `"active"`
**tags** | *Array [string]* | Tags for this session | `["cycling"]`
**meta** | *Object [Session.meta](#Session.meta)* |  | `null`
**logs** | *Array [undefined]* | Event Log file names for each 10 sec window | `null`

__Example:__
```json
{
  "id": "ses:ABCD-1234-ABCD-1234",
  "subject": "sub:1234/1",
  "profile": "pro:1234/1",
  "license": "lic:1234",
  "client": "myEmotiv",
  "headset": "INSIGHT-1234",
  "connected": "2016-12-15T03:37:58.064Z",
  "activated": "2016-12-15T03:37:58.064Z",
  "status": "active",
  "streams": {
    "eeg": [
      "AF3",
      "AF4",
      "AF5",
      "EE1",
      "EE2"
    ],
    "con": [
      "AF3",
      "AF4",
      "AF5",
      "EE1",
      "EE2"
    ],
    "cog": [
      "int",
      "med",
      "foc",
      "fru",
      "exc",
      "eng",
      "lex"
    ],
    "bat": [
      "headset",
      "device"
    ],
    "pow": [
      "alpha",
      "beta",
      "gamma",
      "thetaH",
      "thetaL"
    ],
    "fac": [
      "smile",
      "laugh",
      "clench",
      "frown",
      "suprise",
      "blink",
      "smirk_RL",
      "look_RL",
      "look_UD",
      "wink_RL"
    ],
    "gps": [
      "lat",
      "lon"
    ]
  },
  "markers": [
    "moving",
    "paused"
  ],
  "tags": [
    "cycling"
  ]
}
```

### Session.streams

Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**eeg** | *Array [string]* | EEG MEssage Columns | `["AF3","AF4","AF5","EE1","EE2"]`
**mot** | *Array [string]* | Motion Message Columns | `null`
**con** | *Array [string]* | Contact Message Columns | `["AF3","AF4","AF5","EE1","EE2"]`
**com** | *Array [string]* | Command Message Columns | `null`
**fac** | *Array [string]* | Facial Expression Columns | `["smile","laugh","clench","frown","suprise","blink","smirk_RL","look_RL","look_UD","wink_RL"]`
**cog** | *Array [string]* | Cognitiv Perf Metrics Columns | `["int","med","foc","fru","exc","eng","lex"]`
**bat** | *Array [string]* | Battery Columns | `["headset","device"]`


### Session.config

Property | Type | Description | Example
---- | ---- | ---- | ---- | ----


### Session.meta

Property | Type | Description | Example
---- | ---- | ---- | ---- | ----



---
## Profile

Training Profiles for Mental Commands and facial expressions.




Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**id** | *string* | {emoId}&#x2F;{index} | `"pro:1234.0"`
**type** | *string* |  | `null`
**label** | *String* | Profile name | `null`
**subject** | *string* | The Emo user that created this profile | `"emotiv1/subject1"`
**actions** | *Array [Object [Profile.actions](#Profile.actions)]* |  | `[{"label":"moveD","index":0,"stream":"com","status":"completed","rating":0.77},{"label":"moveU","index":1,"stream":"com","status":"completed","rating":0.57},{"label":"moveL","index":2,"stream":"com","status":"completed","rating":0.57},{"label":"wink","status":"completed","rating":0.77},{"label":"frown","status":"unknown","rating":0.57}]`
**facials** | *Array [Object [Profile.facials](#Profile.facials)]* |  | `null`
**tags** | *Array [undefined]* |  | `null`
**logs** | *Array [undefined]* |  | `null`

__Example:__
```json
{
  "id": "pro:1234.0",
  "name": "myApp1.0",
  "owner": 234,
  "subject": "emotiv1/subject1",
  "status": "active",
  "actions": [
    {
      "label": "moveD",
      "index": 0,
      "stream": "com",
      "status": "completed",
      "rating": 0.77
    },
    {
      "label": "moveU",
      "index": 1,
      "stream": "com",
      "status": "completed",
      "rating": 0.57
    },
    {
      "label": "moveL",
      "index": 2,
      "stream": "com",
      "status": "completed",
      "rating": 0.57
    },
    {
      "label": "wink",
      "status": "completed",
      "rating": 0.77
    },
    {
      "label": "frown",
      "status": "unknown",
      "rating": 0.57
    }
  ]
}
```

### Profile.actions

Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**label** | *String* |  | `"moveD"`
**index** | *Integer* |  | `0`
**stream** | *string* |  | `"com"`
**status** | *string* |  | `"completed"`
**rating** | *Number* | Skill Rating | `0.77`


### Profile.facials

Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**label** | *String* |  | `null`
**index** | *Integer* |  | `null`
**stream** | *string* |  | `null`
**status** | *string* |  | `null`
**rating** | *Number* | Skill Rating | `null`



---
## Subject

A Unique end user. &#39;Sub&#39; users can be created on a parent emoId account by prefixing the sub user &#39;emoId&#39; with the emoId of the parent followed by a &#39;&#x2F;&#39;



Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**id** | *string* | sub:{emotivId}&#x2F;{name} | `"sub:1234/1"`
**type** | *string* |  | `null`
**emotivId** | *String* |  | `null`
**name** | *String* |  | `"Viet Tung"`
**tags** | *Array [undefined]* |  | `null`
**meta** | *Object [Subject.meta](#Subject.meta)* |  | `null`

__Example:__
```json
{
  "id": "sub:1234/1",
  "name": "Viet Tung",
  "year": 1999,
  "hand": "right",
  "gender": "male",
  "email": "tung@viet.nam"
}
```

### Subject.meta

Property | Type | Description | Example
---- | ---- | ---- | ---- | ----



---
## Message

A Sample even Unique end user. &#39;Sub&#39; users can be created on a parent emoId account by prefixing the sub user &#39;emoId&#39; with the emoId of the parent followed by a &#39;&#x2F;&#39;



Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**id** | *string* |  | `"mes:ABCD-1234-ABCD-1234"`
**type** | *string* |  | `null`
**time** | *Integer* |  | `1488926601831`
**eeg** | *Array [number]* | EEG Sensors | `[4000,1000,1000,1000,1000,1000,4000,500,1000,1000,500,1000,1000,5000,1000]`
**cog** | *Array [number]* | Cognitive Performance Metrics | `null`
**com** | *Array [number]* | Mental Commands | `null`
**con** | *Array [number]* | Contact Quality | `[4000,1000,1000,1000,1000,1000,4000,500,1000,1000,500,1000,1000,5000,1000]`
**sig** | *Array [number]* | Signal Strength | `null`
**bat** | *Array [number]* | Signal Strength | `[0.99,0.44,0.44]`
**gps** | *Array [number]* | GPS Location | `null`
**mot** | *Array [number]* | Motion Sensors | `null`
**fac** | *Array [number]* | Facial Expressions | `null`

__Example:__
```json
{
  "id": "mes:ABCD-1234-ABCD-1234",
  "time": 1488926601831,
  "eeg": [
    4000,
    1000,
    1000,
    1000,
    1000,
    1000,
    4000,
    500,
    1000,
    1000,
    500,
    1000,
    1000,
    5000,
    1000
  ],
  "con": [
    4000,
    1000,
    1000,
    1000,
    1000,
    1000,
    4000,
    500,
    1000,
    1000,
    500,
    1000,
    1000,
    5000,
    1000
  ],
  "exp": [
    1,
    0.341,
    1,
    0.444,
    0.555,
    1
  ],
  "bat": [
    0.99,
    0.44,
    0.44
  ]
}
```


---
## License

A License to use cortex &#x2F; sdk.




Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**id** | *string* | License key | `"lic:1234"`
**label** | *String* | Optional User defined license name | `null`
**scope** | *Array [undefined]* |  | `["eeg","pm"]`
**owner** | *string* | License Owner EmoID | `"emotiv1"`
**clients** | *Array [string]* | If defined client must be a member of this set | `null`
**userIds** | *Array [string]* | If defined userId must be a member of this set | `null`
**secret** | *String* | Optional Secret that may be used to sign auth requests as SHA256 HMAC | `null`
**balance** | *Integer* | Available Session Balance | `20`
**maxDevices** | *Integer* | Maximum Devices allowed - default is amount &#x2F; 10 ) | `null`
**dailyDebit** | *Integer* | Maximum Debit per Device per Day | `null`
**devices** | *Array [undefined]* | Current Devices Using License | `["myDev1","myDev2"]`
**amounts** | *Integer* | Initial balance purchased with subscription | `null`
**topups** | *Integer* | Additonal topup sessions | `30`
**status** | *string* |  | `null`
**renewal** | *String (date-time)* | Expiration Date of current billing period | `"2016-12-15T03:37:58.064Z"`
**period** | *Integer* | Billing period in days | `30`

__Example:__
```json
{
  "id": "lic:1234",
  "owner": "emotiv1",
  "scope": [
    "eeg",
    "pm"
  ],
  "amount": 30,
  "topups": 30,
  "balance": 20,
  "period": 30,
  "devices": [
    "myDev1",
    "myDev2"
  ],
  "maxDevice": 3,
  "maxDebits": 10,
  "renewal": "2016-12-15T03:37:58.064Z"
}
```



