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
**label** | *string* | user supplied headset name | `null`
**iface** | *string* |  | `null`
**dongle** | *string* | Dongle serial Id | `null`
**status** | *string* |  | `"connected"`
**serial** | *String* |  | `null`
**hardware** | *String* | Hardware version | `null`
**firmware** | *string* | Firmware version | `"v1.23"`
**sensors** | *Array [undefined]* |  | `["AF3","F7","F3","FC5","T7","P7","O1","O2","P8","T8","FC6","F4","F8","AF4"]`
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
    "F7",
    "F3",
    "FC5",
    "T7",
    "P7",
    "O1",
    "O2",
    "P8",
    "T8",
    "FC6",
    "F4",
    "F8",
    "AF4"
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
## Stream

Configuration Details for a Notification Stream




Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**open** | *Boolean* |  | 
**cols** | *Array [undefined]* |  | 
**fmts** | *Array [undefined]* |  | 
**freq** | *Integer* | Expected Update Frequency | 
**unit** | *String* | Unit for unit values | 
**enums** | *Array [string]* |  | 



---
## Session

Represents an continuous period of eeg related activity using an emotive headset




Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**id** | *string* | Session GUID | `"0001f0bb-afba-4a60-9842-65219e1eb504"`
**label** | *string* |  | `null`
**status** | *string* |  | `"active"`
**subject** | *string* | Emotiv Subject Id | `"user1234"`
**license** | *string* | License used to create session | `"omni_123e4567-e89b-12d3-a456-426655440000"`
**profile** | *string* | Profile used for commands &#x2F; facials detections | `"user1234-1"`
**headset** | *String* |  | `"INSIGHT-1234"`
**client** | *string* | Client Application Identifier | `"myEmotiv"`
**started** | *String (iso)* | Session start time | `"2016-12-15T03:37:58.064Z"`
**stopped** | *String (iso)* | Session stop  time | `"2016-12-15T03:37:58.064Z"`
**markers** | *Array [string]* | Labels for Event Markers | `null`
**streams** | *Object [Session.streams](#Session.streams)* |  | `{"eeg":{"cols":["counter","interp","raw_cq","af3","af4","t7","t8","pz"],"fmts":["float"],"freq":128},"dev":{"cols":["battery","bt_signal","af3_cq","af4_cq","t7_cq","t8_cq","pz_cq"],"fmts":["enum"],"freq":4,"enums":["none","poor","fair","good"]},"cog":{"cols":["int","med","foc","fru","exc","eng","lex"],"freq":2},"pow":{"cols":["alpha","betaH","betaL","gamma","delta"],"freq":8},"fac":{"cols":["smile","laugh","clench","frown","suprise","blink","smirk_RL","look_RL","look_UD","wink_RL"],"freq":2},"gps":{"cols":["lat","lon"]},"mot":{"cols":["counter","interp","gyroX","gyroY","gyroZ","accX","accY","accZ","magX","magY","magZ"],"fmts":["float"],"freq":2},"log":{"cols":["level","code","text"],"fmts":["enum","uint","string"],"enums":["warn","error","debug"]},"pro":{"cols":["action","status","score"]}}`
**tags** | *Array [string]* | Tags for this session | `null`
**logs** | *Array [string]* |  | `["/omni_123e4567-e89b-12d3-a456-426655440000/user1234/0001f0bb-afba-4a60-9842-65219e1eb504/motions.csv","/omni_123e4567-e89b-12d3-a456-426655440000/user1234/0001f0bb-afba-4a60-9842-65219e1eb504/rawEegs.csv","/omni_123e4567-e89b-12d3-a456-426655440000/user1234/0001f0bb-afba-4a60-9842-65219e1eb504/markers.csv","/omni_123e4567-e89b-12d3-a456-426655440000/user1234/0001f0bb-afba-4a60-9842-65219e1eb504/cogPerf.csv"]`

__Example:__
```json
{
  "id": "0001f0bb-afba-4a60-9842-65219e1eb504",
  "subject": "user1234",
  "profile": "user1234-1",
  "license": "omni_123e4567-e89b-12d3-a456-426655440000",
  "client": "myEmotiv",
  "headset": "INSIGHT-1234",
  "started": "2016-12-15T03:37:58.064Z",
  "stopped": "2016-12-15T03:37:58.064Z",
  "status": "active",
  "streams": {
    "eeg": {
      "cols": [
        "counter",
        "interp",
        "raw_cq",
        "af3",
        "af4",
        "t7",
        "t8",
        "pz"
      ],
      "fmts": [
        "float"
      ],
      "freq": 128
    },
    "dev": {
      "cols": [
        "battery",
        "bt_signal",
        "af3_cq",
        "af4_cq",
        "t7_cq",
        "t8_cq",
        "pz_cq"
      ],
      "fmts": [
        "enum"
      ],
      "freq": 4,
      "enums": [
        "none",
        "poor",
        "fair",
        "good"
      ]
    },
    "cog": {
      "cols": [
        "int",
        "med",
        "foc",
        "fru",
        "exc",
        "eng",
        "lex"
      ],
      "freq": 2
    },
    "pow": {
      "cols": [
        "alpha",
        "betaH",
        "betaL",
        "gamma",
        "delta"
      ],
      "freq": 8
    },
    "fac": {
      "cols": [
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
      "freq": 2
    },
    "gps": {
      "cols": [
        "lat",
        "lon"
      ]
    },
    "mot": {
      "cols": [
        "counter",
        "interp",
        "gyroX",
        "gyroY",
        "gyroZ",
        "accX",
        "accY",
        "accZ",
        "magX",
        "magY",
        "magZ"
      ],
      "fmts": [
        "float"
      ],
      "freq": 2
    },
    "log": {
      "cols": [
        "level",
        "code",
        "text"
      ],
      "fmts": [
        "enum",
        "uint",
        "string"
      ],
      "enums": [
        "warn",
        "error",
        "debug"
      ]
    },
    "pro": {
      "cols": [
        "action",
        "status",
        "score"
      ]
    }
  },
  "logs": [
    "/omni_123e4567-e89b-12d3-a456-426655440000/user1234/0001f0bb-afba-4a60-9842-65219e1eb504/motions.csv",
    "/omni_123e4567-e89b-12d3-a456-426655440000/user1234/0001f0bb-afba-4a60-9842-65219e1eb504/rawEegs.csv",
    "/omni_123e4567-e89b-12d3-a456-426655440000/user1234/0001f0bb-afba-4a60-9842-65219e1eb504/markers.csv",
    "/omni_123e4567-e89b-12d3-a456-426655440000/user1234/0001f0bb-afba-4a60-9842-65219e1eb504/cogPerf.csv"
  ]
}
```

### Session.streams

Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**pro** | *string* |  | `{"cols":["action","status","score"]}`
**cog** | *string* |  | `{"cols":["int","med","foc","fru","exc","eng","lex"],"freq":2}`
**mot** | *string* |  | `{"cols":["counter","interp","gyroX","gyroY","gyroZ","accX","accY","accZ","magX","magY","magZ"],"fmts":["float"],"freq":2}`
**fac** | *string* |  | `{"cols":["smile","laugh","clench","frown","suprise","blink","smirk_RL","look_RL","look_UD","wink_RL"],"freq":2}`
**com** | *string* |  | `null`
**eeg** | *string* |  | `{"cols":["counter","interp","raw_cq","af3","af4","t7","t8","pz"],"fmts":["float"],"freq":128}`
**dev** | *string* |  | `{"cols":["battery","bt_signal","af3_cq","af4_cq","t7_cq","t8_cq","pz_cq"],"fmts":["enum"],"freq":4,"enums":["none","poor","fair","good"]}`



---
## Profile

Training Profiles for Mental Commands and facial expressions.




Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**id** | *string* | {emotivId}&#x2F;{index} | `1234`
**type** | *string* |  | `null`
**label** | *String* | Profile name | `null`
**subject** | *string* | The Subject ID associated with this profile | `"1234/1"`
**command** | *string* |  | `[{"label":"moveD","status":"completed","rating":0.77},{"label":"moveU","status":"completed","rating":0.57},{"label":"moveL","status":"completed","rating":0.57}]`
**faceExp** | *string* |  | `null`
**tags** | *Array [undefined]* |  | `null`
**logs** | *Array [undefined]* |  | `null`

__Example:__
```json
{
  "id": 1234,
  "name": "myApp1.0",
  "owner": 1234,
  "subject": "1234/1",
  "command": [
    {
      "label": "moveD",
      "status": "completed",
      "rating": 0.77
    },
    {
      "label": "moveU",
      "status": "completed",
      "rating": 0.57
    },
    {
      "label": "moveL",
      "status": "completed",
      "rating": 0.57
    }
  ],
  "facExps": [
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


---
## Subject

A Unique end user. &#39;Sub&#39; users can be created on a parent emoId account by prefixing the sub user &#39;emoId&#39; with the emoId of the parent followed by a &#39;&#x2F;&#39;



Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**id** | *string* | {emotivId}&#x2F;{name} | `"1234/1"`
**type** | *string* |  | `null`
**owner** | *String* | Emotiv ID | `null`
**name** | *String* |  | `"Viet Tung"`
**tags** | *Array [undefined]* |  | `null`
**meta** | *Object [Subject.meta](#Subject.meta)* |  | `null`

__Example:__
```json
{
  "id": "1234/1",
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

A Message about an an opened session, sent to clients in response to subscription requests.



Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**sid** | *string* |  | `"ABCD-1234-ABCD-1234"`
**time** | *String (iso)* |  | `1488926601831`
**eeg** | *Array [number]* | EEG Data Samples | `[40,10,10,10,10,10,50]`
**cog** | *Array [number]* | Cogntive Metrics | `null`
**fac** | *Array [number]* | Facial Expressions | `[1,0.34,1,0.44,0.55,1]`
**com** | *Array [number]* | Mental Commands | `null`
**pow** | *Array [number]* | Band Powers | `null`
**mot** | *Array [number]* | Motion sensors | `null`
**qua** | *Array [integer]* | Contact Quality | `null`
**dev** | *Array [integer]* | Device Status | `[4,1,1,1,0,1]`
**pro** | *Array [undefined]* | Profile Training | `null`
**tag** | *Array [integer]* | Context Tags | `null`
**log** | *Array [integer]* | Log Messages | `null`

__Example:__
```json
{
  "sid": "ABCD-1234-ABCD-1234",
  "time": 1488926601831,
  "eeg": [
    40,
    10,
    10,
    10,
    10,
    10,
    50
  ],
  "dev": [
    4,
    1,
    1,
    1,
    0,
    1
  ],
  "fac": [
    1,
    0.34,
    1,
    0.44,
    0.55,
    1
  ]
}
```


---
## License

A License to use cortex &#x2F; sdk.




Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**id** | *string* | License key | `1234`
**type** | *string* |  | `null`
**label** | *String* | Optional User defined license name | `null`
**scope** | *Array [undefined]* |  | `["eeg","pm"]`
**owner** | *string* | License Owner EmoID | `"emotiv1"`
**clients** | *Array [string]* | If defined client must be a member of this set | `null`
**userIds** | *Array [string]* | If defined userId must be a member of this set | `null`
**secret** | *String* | Optional Secret that may be used to sign auth requests as SHA256 HMAC | `null`
**balance** | *Integer* | Available Session Balance | `20`
**maxDevices** | *Integer* | Maximum Devices allowed - default is amount &#x2F; 10 ) | `3`
**dailyLimit** | *Integer* | Maximum Debit per User per Day | `20`
**expires** | *String (date-time)* | Expiration Date of current billing period | `"2016-12-15T03:37:58.064Z"`
**devices** | *Array [undefined]* | Current Devices Using License | `["myDev1","myDev2"]`
**initial** | *Integer* | Initial balance purchased with subscription | `null`
**topups** | *Integer* | Additonal topup sessions | `30`
**status** | *string* |  | `null`
**period** | *Integer* | Billing period in days | `30`

__Example:__
```json
{
  "id": 1234,
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
  "maxDevices": 3,
  "dailyLimit": 20,
  "expires": "2016-12-15T03:37:58.064Z"
}
```


---
## AuthRequest

Authorize Request




Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**license** | *string* |  | 
**username** | *string* |  | 
**password** | *string* |  | 
**debit** | *Integer* |  | 
**client** | *String* |  | 
**timestamp** | *String (date-time)* |  | 
**_hash** | *String* |  | 



---
## AuthResponse

Authorize Response




Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**_auth** | *String* |  | 
**scope** | *Array [undefined]* |  | 
**license** | *String* |  | 
**expires** | *String (date-time)* |  | 
**balance** | *Integer* |  | 



---
## Context

Application Context for sessions




Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**session** | *string* | Session GUID | 
**license** | *String* | license used to create context | 
**client** | *String* | The Client App that created this context | 
**group** | *String* | Context group | 
**label** | *String* | String label for this context | 
**value** | *Integer* | Numeric value for this context | 
**started** | *String (date-time)* |  | 
**stopped** | *String (date-time)* |  | 
**meta** | *Object [Context.meta](#Context.meta)* |  | 
**docs** | *Array [string]* |  | 


### Context.meta

Property | Type | Description | Example
---- | ---- | ---- | ---- | ----




