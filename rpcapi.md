## __Cortex API__
---
[TOC]
 
---
## Overview 

All requests and responses should follow jsonrpc 2.0
More info...

__REQUEST:__

Param   | Required (default) | Description 
--------|----------|-----
id      | No       | Optional JSON RPC ID if a response is required
jsonrpc | yes      | Should be '2.0'
method  | yes      | Should be one of Methods listed below
params  | yes      | Should be params confirming to the Methods list below.
_auth   | No       | Optional 'auth' token to 
_hash   | No       | Optional SHA256 hash of the request signed using client secret (if known)

__RESPONSE:__

Param   | Required (default) | Description 
--------|----------|-----
id      | No       | Optional JSON RPC ID if a response is required
jsonrpc | yes      | '2.0'
result  | No       | Result 
error   | No       | 

__ERROR CODES__

Code  | Methods    | Description 
------|------------|------------
100   | *          | Invalid Auth Token
101   | subscribe  | Invalid Stream Name
102   | *          | Invalid Session Id
103   | *          | Invalid Profile Id
104   | *          | Invalid Headset Id
105   | *          | Invalid Subject Id
106   | *          | Unknown Method
106   | session    | Session Not Active
106   | session    | Auth Token Expired
106   | session    | Headset In Use 

__MESSAGES:__ 

Messages are Event Notifications sent to a client in response to 
subscription request. Only parameters that are included in the list
of 'streams' defined in the subscription request should be included
in message sent  to the client.
All Messages must be linked to an active session,   

Param   | Required | Description 
--------|----------|-------------
id      | Yes      | Session Id
time    | Yes      | Message Timestamp  
profile | No       | Profile Training Messages (eg training started, completed)
headset | No       | Headset Update Messages (eg connection status, battery and signal strength)
faceExp | No       | Facial Expression Detection Messages 
command | No       | Mental Command Detection Messages 
session | No       | Session Update Messages (eg changes to status, headset or profile)
cogPerf | No       | Session Update Messages (eg changes to status, headset or profile)
subject | No       | Subject Update Messages (eg changes to subject properties )
eegData | No       | Raw EEG Samples
motions | No       | Subject Update Messages (eg changes to subject properties )
contact | No       | Contact Quality  Measures

__EXAMPLES:__

_RPC Request with Response:_
```javascript
<< { jsonrpc:'2.0',  method:'myMeth', params: {..} }
>> { jsonrpc:'2.0', id:1, result:{..} } // success
```

_RPC Request with Error:_
```javascript
<< { jsonrpc:'2.0', _auth: 'XSAASD', method:'myMeth', params: {..} }
>> { jsonrpc:'2.0', id:1, error:{ code: 100, text: 'Invalid Request' } } // success
```

_RPC Request with Auth Token:_
```javascript
<< { jsonrpc:'2.0', _auth: 'XSAASD', method:'myMeth', params: {..} }
>> { jsonrpc:'2.0', id:1, result:{..} } // success
```

_RPC Notify without Response:_
```javascript
<< { jsonrpc:'2.0', method:'myMeth', params: {..} }
```

_EEG Data Notificaton:_
```javascript
<< { id: 'abcd-1234', time: 1489191278895, eegData:[100, 200, 300, 400 ] }
```
_Cognitive Performance Notificaton:_
```javascript
<< { id: 'abcd-1234', time: 1489191278895, cogPerf:[100, 200, 300, 400 ] }
```
_Combined Notifications:_
```javascript
<< { id: 'abcd-1234', time: 1489191278895, eegData:[100, 200, 300, 400, 444 ], contact:[99, 55,  22, 44, 44] }
```

---
## Authorize

Request authorization Token

__REQUEST:__

Param   | Required (default) | Description 
--------|----------|-----
license | No       | License Key (if avialble)
client  | Yes      | Application Identifier  
device  | No (cur device) | Device Identifier
debit   | No (10)  | Number of sessions requested
subject | No (current User) | User to Authorize 
scopes  | No (basic)  | License scope requested
time    | No (now)  | Current Timestamp in epoch time
_hash   | No        | SHA256 hash of the request signed using license secret (if known)

__RESPONSE:__

- Should open authorization dialog if licId is not supplied and scope is not 'basic'
- Should return error if time is not within 1 minute of now. 
- open authorization dialog if licId is not supplied and scope is not 'basic'
- Should prompt for new password if does not match current logged in user.
- Should trigger [authorization request](access.md#markdown-header-cloud-authorization-request) to auth service)
- Should return errors authorization response errors from auth service. 
- Should return auth response 



__EXAMPLES:__

_Auth using Basic License_
```javascript
<< { id: 1, jsonrpc: '2.0', method: 'authorize' }
>> { id: 1, jsonrpc: '2.0', result: { _auth: 'ABC1234' } }
```
_Auth using Basic License with new username / password_
```javascript
<< { id: 1, jsonrpc: '2.0', method: 'authorize', params: { username: 'user1', password:'pass1' } }
>> { id: 1, jsonrpc: '2.0', result: { _auth: 'ABC1234' } }
```

_Auth using Existing Login and New License_  
```javascript
<< { id: 1, jsonrpc: '2.0', method: 'authorize', params:  
     { "debit": 10,
     , "license": "2c9f7696-5c6f-4018-b9cd-67a7fb12aaee"
     }
   }
>> { id: 1, jsonrpc: '2.0', , result: 
     { _auth: 'AAAAAAA', expires: '2016-12-22T01:36:38.413Z', scopes:  ['basic','eeg', 'pm']
     }
   }
```

_Self Signed Request With User name and Password_
```javascript
<< { id: 1, jsonrpc: '2.0', method: 'authorize', _hash: 'AAASSS', params:  
     { "username": "aoanh94"
     , "grant_type": "password"
     , "client": "com.emotiv.omniscience"
     , "debit": 10,
     , "license": "2c9f7696-5c6f-4018-b9cd-67a7fb12aaee"
     , "password": "ZYv%g3lhKp"
     , "device_id": "8e22d8fe-8b9b-4913-84fc-93f96d1e3d3d"
     }
   }
>> { id: 1, jsonrpc: '2.0', , result: 
     { _auth: 'AAAAAAA', expires: '2016-12-22T01:36:38.413Z', scopes:  ['basic','eeg', 'pm']
     }
   }
```

_Self Signed Request With Access Token_
```javascript
<< { id: 1, jsonrpc: '2.0', method: 'authorize', _hash: 'AAASSS', params:  
     { "access_token": "1234asdfasa22434"
     , "grant_type": "token"
     , "client": "com.emotiv.omniscience"
     , "debit": 10,
     , "license": "2c9f7696-5c6f-4018-b9cd-67a7fb12aaee"
     , "device_id": "8e22d8fe-8b9b-4913-84fc-93f96d1e3d3d"
     }
   }

>> { id: 1, jsonrpc: '2.0', , result: 
     { _auth: 'AAAAAAA', expires: '2016-12-22T01:36:38.413Z', scopes:  ['basic','eeg', 'pm']
     }
   }
```

---
## CreateSession

__REQUEST:__ 

Params    | Required | Description 
----------|----------|---------------
_auth     | Yes      | Access Token
streams   | No       | Streams to subscribe to    
headset   | No (connected headset) | Headset to use.
profile   | No (default profile)   | Profile to use for Commands etc..
subject   | No (current user) |
markers   | No        | Enumeration to interpret markers
status    | No (opened) | 

__RESPONSE:__ 

- Should fail if _auth is not valid
- Should fail if _auth session balance is zero
- Should fail if headset is not connected
- Should fail if headset is already in use in another active session
- Should fail if subject is already in use in another active session
- Should fail if profile is invalid
- Should fail if subject is invalid
- Should subscribe to streams in subscribe list 
- Should return new session object ([Object](models.md#Object))   

__EXAMPLES:__

```javascript
<<  { id: 1, jsonrpc: '2.0', method: 'createSession', _auth: 'myToken', params: 
      { headset: INSIGHT-1234, status: active, subscribe: { streams: ['eeg','con'] }

>>  { id: 1, jsonrpc: '2.0', result: 
      { id: 'session/1234.99999'
      , status: active
      , created: 
      , started: 
      , stopped: null  
      , headset: 'INSIGHT-1234'
      , markers: []
      , streams:
        { contact: { cols: ['ALL',  'AF1', 'AF2'], freq: 128, min:0, max:8000 } ] }
        , bandPow: { cols: ['Alpha', 'Beta', 'Gamma', 'Theta']}
        , eegData: { cols: ['Alpha', 'Beta', 'Gamma', 'Theta']}
        , cogPerf: { cols: ['EXC', 'REL', 'FOC', 'INT', 'FRU', 'LEX'] }
        , command: { cols: ['Push', 'Push', 'MoveU','MoveD', 'MoveR', 'MoveL'] }
        , profile: { cols: ['Command', 'Status'], enums:['started', 'stopped'] }
        , headset: { cols: ['battery', 'signal', 'contact']}
        , motions: { cols: ['gyroX', 'gyroY', 'gyroZ'] }
        , faceExp: { cols: ['Frown', 'Clench','Smile', 'Surprise', 'Laugh', 'Blink', 'Wink_RL', 'look_RL', 'look_UD', 'Smirk_RL'] }
      }
    }
```

---
## QuerySessions

__REQUEST:__

Params    | Required (default) | Description 
----------|----------|------------
_auth     |         | Access Token
id        | No | Session Id to return
status    | No | status to match against
subject   | No | Subject to match against 
profile   | No | Profile to  match against
created   | No | Minimum Created Time
started   | No | Minimum Started Time 
stopped   | No | Minimum Stopped Time


__RESPONSE:__

- Should return a list of matching session records
- should only return sessions where either session.shared is true or session.licId is auth licId
- should only return sessions where emoId is substring of _auth licId 
- Should fail if _auth token is invalid
- Should return a list of matching session objects ([Object](models.md#Object))   

__EXAMPLES:__

```javascript
<<  { id: 1, jsonrpc: '2.0', method: 'querySessions', params: 
      { _auth: 'myToken', status: 'closed' }

>>  { id: 1, jsonrpc: '2.0', result: 
      [ { id: '1234-1111', subject:'1234', status: 'active', started: 999999, headset: 'INSIGHT-1234' } 
      , { id: '1234-1112', subject:'1234', status: 'opened', started: 888888, headset: 'INSIGHT-1234' }
      , { id: '1234-1113', subject:'1234', status: 'closed', started: 888888, headset: 'INSIGHT-1234' }
      , { id: '1234-1114', subject:'1234', status: 'active', started: 888888, headset: 'INSIGHT-1234' }
      ]
    }
```

---
## UpdateSession

__REQUEST:__

Params    | Required (default) | Description 
----------|----------|------------
_auth     |         | Access Token
id        | Yes      | Session to update 
status    | No      | active, closed 


__RESPONSE:__

- Should return updated session object. 
- Should fail if session license does not match auth license
- Should fail if no _auth token is invalid
- When status = closed then no more events should be published for the session, and logs  should be saved.
- When status = paused then No EEG  or EEG and Other EVENT logs should be saved in 10 sec chunks as attachments to session
- When status = active then EEG streams should be published and saved to log file
- Should return updated session object ([Object](models.md#Object))   
- Should subscribe to session stream of current session


__EXAMPLES:__

```javascript
<<  { id: 1, jsonrpc: '2.0', method: 'updateSession', _auth: 'myToken', params: 
      { _auth: 'myToken', status: 'closed' }

>>  { id: 1, jsonrpc: '2.0', result: 
      { id: '1234.99999', connected:"2017-03-07T20:10:0011Z", headset: 'INSIGHT-1234' }
      }
    }
```

---
## Subscribe

__REQUEST:__ 

Param    | Required | Description 
---------|--------|------------
_auth    |        | Access Token
streams  | Yes    | Array of event types to subscribe to
session  | No     | Session ID to subscribe to 
since    | No (Now) | Get all events since this offset from session start time

__RESPONSE:__

- Should fail if session (sesId) is not active.
- Should fail if session (sesId) _auth license does not match session license
- Should fail if _auth scope is 'basic' and events include 'eeg' or 'met'
- Should fail if _auth scope is 'extra' and events include 'met'
- Should return prior events with an offset greater than 'since' (if defined)

Property | Description
---------|-------------
streams  | Array of event types to subscribe to
session  | Session ID to subscribe to 

__EXAMPLES:__

```javascript
<<  { id: 1, jsonrpc: '2.0', method: 'subscribe', _auth: 'myToken', params: 
      { session: 1234, streams: ['eegData', 'metrics'] }
    }

>>  { id: 1, jsonrpc: '2.0', result: true }
>>  { id: 1, jsonrpc: '2.0', error : { code: 123, text: 'eegData unavailable' }

>>  { session:'1234', time: 8888888, eegData:[0.001, 0.004, .. ]}
```
---
## Unsubscribe

__REQUEST:__

Params    | Required | Description 
----------|----------|-------
_auth     | Yes     | Access Token
streams   | Yes     | List of event types to unsubscribe
session   | No      | Session to unsubscribe from

__RESPONSE:__

- Should fail if sesId is not active.

__EXAMPLES:__

```javascript
<<  { id: 1, jsonrpc: '2.0', method: 'subscribe', _auth: 'myToken', params: 
      { streams: ['eeg'] }
    }

>>  { id: 1, jsonrpc: '2.0', result: [] }
```

---
## InjectMarker

Inject Markers into the EEG Stream

Params    | Required | Default | Description 
----------|----------|---------|--
_auth     | Yes      |         | Access Token
session   | No       | current | Session Id to inject markers to  
label     | No       | None    | Marker Label 
time      | No       | Now     | Epoch Time for when injection should occur

__RESPONSE:__

- Should fail if session is invalid
- Should fail if session is not active
- Should fail if label is not defined.
- Should append label to marker list of session if not present.
- Should inject index of marker label from session to EEG stream at specified timestamp.
- Should return ok.


__EXAMPLES:__

```javascript
<<  { id: 1, jsonrpc: '2.0', method: 'createMarker', params:
      { tags: ['myMarker1'] }
    }

>>  { id: 1, jsonrpc: '2.0', result: {}}
```

---
## QueryHeadsets

__REQUEST:__

Params    | Required | Description 
----------|----------|---------|------------
id    | No (null) | Id of the headset to return
status | No        |  

__RESPONSE:__

- Should return a list of Headset Objects. 
- Should fail if no session is open.
- Should return a list of matching headset objects ([Headset](models.md#Headset))   
- Should subscribe to headset stream of current session


__EXAMPLES:__

```javascript
<<  { id: 1, jsonrpc: '2.0', method: 'queryHeadsets', params: { _id: 'INSIGHT*' } }

>>  { id: 1, jsonrpc: '2.0', result: 
      [ { id: 'INSIGHT-1234', status: 'connected' }
      , { id: 'INSIGHT-1235', status: 'paired'   }
      ]
    }
```

---
## UpdateHeadset

__REQUEST:__

Params    | Required  | Description 
----------|-----------|------------
_id       | Yes       | ID of headset to connect
name      | No        | Name of headset 
status    | No        | 
settings  | No        | 

__RESPONSE:__

- Should return updated headset object. 
- Should fail if headset id is not known
- Should return a updated headset object ([Headset](models.md#Headset))   
- Should subsribe to headset stream of current session

__EXAMPLES:__

```javascript
<<  { id: 1, jsonrpc: '2.0', method: 'updateHeadset', params: 
      { id: 'INSIGHT-1234', label: 'MyInsight' }
    }

>>  { id: 1, jsonrpc: '2.0', result: 
     { id: 'INSIGHT-1234', label: 'MyInsight' }
    }
```

---
## TrainProfile

Train Mental Commands and Facial Expressions 

__REQUEST:__

Params    | Required    | Description 
----------|-------------|------------
session   | No (active) | Session Id 
profile   | No (active) | Profile Id 
command   | No (neutral)| command to train     
faceExp   | No (neutral)| faceExp to train     
action    | No (start)  | training action

__RESPONSE:__

- Should fail if session not active
- Should fail if profile Id not valid
- Should fail if action not valid
- Should fail if training in progress 
- Should set profile of specified session 
- Should default to active profile if not specified
- Should return standard success object 
- Should subscribe to 'profile' stream of the specified session

__EXAMPLES:__

__Mental Command Training__
```javascript
<<  { id: 1, jsonrpc: '2.0', method: 'trainProfile', params:
      { session: 'ses1234', command: 'moveL', action:'begin' }
    }
>>  { id: 1, jsonrpc: '2.0', result: 'ok' }
...

>>  { id: 'ses123', time: 1489191278895, profile:['moveR', 1, 0.5, 'complete'] } 
```

---
## CreateProfile

Create a new Training Profile

__REQUEST:__ 

Params    | Required | Description 
----------|----------|---------|------------
name      | No (id)  | Name of this profile
commands  | No       | Labels for mental commands (max 4)

__RESPONSE:__

- Should return a new profile model ([Profile](models.md#Profile))   

__EXAMPLES:__

```javascript
<<  { id: 1, jsonrpc: '2.0', method: 'createProfile', params: 
      { commands: ['moveR'], name: 'myProfile' }
    }

>>  { id: 1, jsonrpc: '2.0', result:
      { _id: 'pro:1234.0'
      , ratings: [0]
      , commands:[ 'moveL']
      , emoId: 'emo:1234'
      }
    }
```

---
## QueryProfiles

__REQUEST:__

Params    | Required | Description 
----------|----------|------------
_auth      | Yes      | Access token
subject     |          | 

__RESPONSE:__

- Should fail if _auth token invalid
- Should return list of profile records
- Should return a list of matching Profile Models for the current user ([Profile](models.md#Profile))   

__EXAMPLES:__

```javascript
<<  { id: 1, jsonrpc: '2.0', method: 'queryProfiles', params: {emoId: 'emo:1234}}

>>  { id: 1, jsonrpc: '2.0', result: {
          [ { _id: 'pro:1234.99999', emoId: 'emo:1234', status: 'active', ... } 
        , { _id: 'pro:1234.88888', emoId: 'emo:1235', status: 'inactive', .. } 
      ]
     }
```

---
## UpdateProfile

__REQUEST:__

Params    | Required    | Description 
----------|-------------|-----------
_auth      | Yes         | Access token
id        | No (active) | Id of profile to load (default = active profile) 
status    | No          | New Status ('active', 'inactive')
name      | No          |
commands  | No          |        

__RESPONSE:__

- Should update 'profile' with id as active'
- Should return  matching profile object'
- Should fail if id is not valid
- Should fail if token is not valid
- Should return updated Profile Model ([Profile](models.md#Profile))   

__EXAMPLES:__

```javascript
<<  { id: 1, jsonrpc: '2.0', method: 'updateProfile', params: 
      { _id: 'pro:1234.99999', name: 'Mat1' }

>>  { id: 1, jsonrpc: '2.0', result: 
      { _id: 'pro:1234.99999, name: 'Mat1', status: 'active' }
    }
```
---
## CreateSubject

__REQUEST:__

Params    | Required | Default | Description 
----------|----------|---------------
_auth     |          | Access Token
name      | No       | Subjec Name  
gender    |          | 

__RESPONSE:__

- Should fail if auth token is not valid
- Should fail if auth scope is basic
- Should fail if sex is not defined. 
- Should fail if year is not defined 
- Should fail if hand is not defined. 
- Should return new Subject Model ([Subject](models.md#Subject))   

__EXAMPLES:__

```javascript
<<  { id: 1, jsonrpc: '2.0', method: 'createEmoUser', params: 
      { _auth: 'my_authToken', _id:'emo:1234/sub1', sex:'male', hand:'right', year:'1990', name:'subject1' } 
    }

>>  { id: 1, jsonrpc: '2.0', result: 
      { _id:'emo:1234/sub1', sex:'male', hand:'right', year:'1990', name:'subject1' } 
   
```

---
## QuerySubjects

Get a list of subject created for the current user.

__REQUEST:__

Params    | Required | Description 
----------|----------|---------------
_auth     |          | Access Token
id        | No       | Subject Id to Match
name      | No       | Name substring to match 
year      | No       | Year to match 
tags      | No       | Tags to match 

__RESPONSE:__

- Should fail if _auth token is not valid
- Should fail if license scope is basic
- Should a list of matching subjects model for current user ([Subject](models.md#Subject))   

__EXAMPLES:__

```javascript
<< { id: 1, jsonrpc: '2.0', method: 'querySubjects', params: 
     { _auth: 'my_authToken' } 
   }

>> { id: 1, jsonrpc: '2.0', result: 
     [ { id:'user1/1234', gender:'male', hand:'right', year:'1990', name:'Jane Doe' } 
     , { id:'user1/1235', gender:'male', hand:'right', year:'1990', name:'subject1' } 
     ] 
   }
```


---
## UpdateSubject

Update Subject Properties

__REQUEST:__ 

Params    | Required | Description 
----------|----------|---------------
_auth     |          | Access Token
id        | Yes      | Subject Id
name      | No       | New name
gender    | No       | New gender
tags      | No       | New tags
year      | No       | New birth year
status    | No       | New Status

__RESPONSE:__

- Should fail if _auth token is not valid
- Should fail if license scope is basic
- Should fail if _id does not match existing emoUser record 
- Should fail if _id is not substring of logged in user emoId +'/'
- Should a single updated subject model ([Subject](models.md#Subject))   


__EXAMPLES:__

```javascript
<<  { id: 1, jsonrpc: '2.0', method: 'updateEmoUser', params: 
      { _auth: 'my_authToken', _id: 'emo:1234/sub1', name:'First Subject' } 
    }

>>  { id: 1, jsonrpc: '2.0', result: 
      { _id:'emo:1234/sub1', sex:'male', hand:'right', year:'1990', name:'First Subject' } 
    }
```
