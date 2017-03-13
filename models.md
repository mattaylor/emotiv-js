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
## Stream

Configuration Details for a Notification Stream




Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**open** | *Boolean* |  | 
**cols** | *Array [undefined]* |  | 
**spec** | *Array [undefined]* |  | 
**freq** | *Integer* | Expected Update Frequency | 
**unit** | *String* | Unit for unit values | 
**enums** | *Array [string]* |  | 



---
## Session

Represents an continuous period of eeg related activity using an emotive headset.




Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**id** | *string* | Session GUID | `"ABCD-1234-ABCD-1234"`
**label** | *string* |  | `null`
**status** | *string* |  | `"active"`
**subject** | *string* | Emotiv Subject Id | `"1234/1"`
**license** | *string* | License used to create session | `1234`
**profile** | *string* | Profile used for commands &#x2F; facials detections | `"1234/1"`
**headset** | *String* |  | `"INSIGHT-1234"`
**client** | *string* | Client Application Identifier | `"myEmotiv"`
**started** | *String (date-time)* | Session start time | `"2016-12-15T03:37:58.064Z"`
**stopped** | *String (date-time)* | Session stop  time | `"2016-12-15T03:37:58.064Z"`
**markers** | *Array [string]* | Labels for Event Markers | `null`
**streams** | *Object [Session.streams](#Session.streams)* |  | `{"eeg":{"cols":["AF3","AF4","AF5","EE1","EE2"],"spec":["uint"]},"con":{"cols":["AF3","AF4","AF5","EE1","EE2"],"spec":["enum"]},"cog":{"cols":["int","med","foc","fru","exc","eng","lex"]},"dev":{"cols":["battery","signal"],"spec":["pct","enum","enum"]},"pow":{"cols":["alpha","beta","gamma","thetaH","thetaL"]},"fac":{"cols":["smile","laugh","clench","frown","suprise","blink","smirk_RL","look_RL","look_UD","wink_RL"]},"gps":{"cols":["lat","lon"]},"mot":{"cols":["gyroX","gyroY","gyroZ","accelX","accelY","accelZ"]},"pro":{"cols":["action","status"]}}`
**tags** | *Array [string]* | Tags for this session | `null`
**logs** | *Array [undefined]* | Event Log file names for each 10 sec window | `null`

__Example:__
```json
{
  "id": "ABCD-1234-ABCD-1234",
  "subject": "1234/1",
  "profile": "1234/1",
  "license": 1234,
  "client": "myEmotiv",
  "headset": "INSIGHT-1234",
  "started": "2016-12-15T03:37:58.064Z",
  "stopped": "2016-12-15T03:37:58.064Z",
  "status": "active",
  "streams": {
    "eeg": {
      "cols": [
        "AF3",
        "AF4",
        "AF5",
        "EE1",
        "EE2"
      ],
      "spec": [
        "uint"
      ]
    },
    "con": {
      "cols": [
        "AF3",
        "AF4",
        "AF5",
        "EE1",
        "EE2"
      ],
      "spec": [
        "enum"
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
      ]
    },
    "dev": {
      "cols": [
        "battery",
        "signal"
      ],
      "spec": [
        "pct",
        "enum",
        "enum"
      ]
    },
    "pow": {
      "cols": [
        "alpha",
        "beta",
        "gamma",
        "thetaH",
        "thetaL"
      ]
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
      ]
    },
    "gps": {
      "cols": [
        "lat",
        "lon"
      ]
    },
    "mot": {
      "cols": [
        "gyroX",
        "gyroY",
        "gyroZ",
        "accelX",
        "accelY",
        "accelZ"
      ]
    },
    "pro": {
      "cols": [
        "action",
        "status"
      ]
    }
  }
}
```

### Session.streams

Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**prof** | *string* |  | `null`
**perf** | *string* |  | `null`
**gyro** | *string* |  | `null`
**face** | *string* |  | `null`
**comm** | *string* |  | `null`
**eegs** | *string* |  | `null`
**head** | *string* |  | `null`
**cust** | *string* |  | `null`
**cont** | *string* |  | `null`



---
## Profile

Training Profiles for Mental Commands and facial expressions.




Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**id** | *string* | {emotivId}&#x2F;{index} | `1234`
**type** | *string* |  | `null`
**label** | *String* | Profile name | `null`
**subject** | *string* | The Subject ID the  created this profile | `"1234/1"`
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

A Sample even Unique end user. &#39;Sub&#39; users can be created on a parent emoId account by prefixing the sub user &#39;emoId&#39; with the emoId of the parent followed by a &#39;&#x2F;&#39;



Property | Type | Description | Example
---- | ---- | ---- | ---- | ----
**sid** | *string* |  | `"ABCD-1234-ABCD-1234"`
**time** | *String (date-time)* |  | `1488926601831`
**eeg** | *Array [integer]* | EEG Data Samples | `[4000,1000,1000,1000,1000,1000,4000,500,1000,1000,500,1000,1000,5000,1000]`
**cog** | *Array [integer]* | Performance Metrics | `null`
**con** | *Array [integer]* | Contact Quality | `[4000,1000,1000,1000,1000,1000,4000,500,1000,1000,500,1000,1000,5000,1000]`
**dev** | *Array [integer]* | Device Status | `[0.99,0.44,0.44]`
**pro** | *Array [undefined]* | Profile Trainging | `null`
**mot** | *Array [integer]* | Motion sensors | `null`
**pow** | *Array [integer]* | Band Powers | `null`

__Example:__
```json
{
  "sid": "ABCD-1234-ABCD-1234",
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
  "fac": [
    1,
    0.341,
    1,
    0.444,
    0.555,
    1
  ],
  "dev": [
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
**dailyLimit** | *Integer* | Maximum Debit per User per Day | `10`
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
  "dailyLimit": 10,
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
**expires** | *String (dat-time)* |  | 
**balance** | *Integer* |  | 




