## Features

- Detail log
- Log warn open/close

## Installing

Using npm:

```bash
$ npm install logks-cheddo
```

## Example

```js
TypeScript
import logg from 'logks-cheddo'

JavaScript
const logg = require('logks-cheddo')
```

In env file
##### LOG_WARN=Y or N       //default N
##### LOG_DETAIL=Y or N     //default N
##### APP_NAME=$yourappname //default APPLICATION

##### Y is print console log
##### N is not print console log

```js
import logg from 'logks-cheddo'

// init log  every route
logg.detail(session, initInvoke, scenario, method, token)

// add incoming Input Req
logg.addInputRequest(node, cmd, url, protocol, rawData)

// add outgoing req data
logg.addOutputRequest(node, cmd, invoke, rawData)

// add incoming resp data
logg.addInputResponse(node, cmd, invoke, rawData)

// add outgoing resp data
logg.addOutputResponse(node, cmd, invoke, protocol, rawData)

// get data detail log
const getlog = logg.getDetail()

// end log
logg.end(err?)

// console log
logg.warn('print', { foo : bar })
// print { foo : bar }
```

```js
import logg from 'logks-cheddo'

logg.detail('11','22','33','44','55')
logg.addInputRequest('1','2','3','4','5')
logg.addOutputRequest('a','b','c','d')
logg.addInputResponse('aa','bb','cc','dd')
logg.addOutputResponse('66','77','88','99','00')
logg.end()

{
  LogType: 'DETAIL_LOG',
  AppName: 'APPLICATION',
  Token: '55',
  User: null,
  Session: '11',
  InitInvoke: '22',
  Scenario: '33',
  Identity: null,
  Method: '44',
  Status: 'SUCCESS',
  InputTimeStamp: '2021-01-25T12:02:31.789',
  Input: [ { Url: '3', Event: '1.2', Type: 'REQUEST', RawData: '5' } ],
  service: [
    {
      ReqTime: '2021-01-25T12:02:31.790',
      Invoke: 'c',
      Event: 'a.b',
      Type: 'REQUEST',
      RawData: 'd'
    },
    {
      ResTime: '2021-01-25T12:02:31.790',
      Invoke: 'cc',
      Event: 'aa.bb',
      Type: 'RESPONSE',
      RawData: 'dd'
    }
  ],
  OutputTimeStamp: '2021-01-25T12:02:31.790',
  Output: [ { Invoke: '88', Event: '66.77', Type: 'RESPONSE', RawData: '00' } ],
  ProcessingTime: '1 ms',
  Error: null
}

```


## License

MIT