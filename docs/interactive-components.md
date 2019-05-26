## interactive-componets
> 상호작용이 가능한 컴포넌트
> 대표적으로 버튼이 있음.

인터랙티브 컴포넌트는 특정 기능이 있는 컴포넌트를 말한다.
링크를 삽입하거나
상태를 변경하거나
유저 정보를 바꾸거나
등등 슬랙의 모든 기능과 일부 HTTP를 사용할 수 있게 해준다.

계획한 인터렉티브 컴포넌트는 이것이다.
1. 주기적으로 버튼이 포함된 메시지를 채널에 게시한다.
2. 버튼을 누르면 PRIVATE 채널로 납치(?) 초대된다.
3. PRIVATE 채널 역시 버튼이 있다. 버튼을 누르면 채널에서 빠져나온다.
4. PRIVATE 채널의 상태에 따라 공개 채널에 메시지를 게시한다.

## Mechanism
슬랙에 PostMessage 바디에 컴포넌트를 넣고 POST 요청을 보낸다.
메시지에 포함된 버튼을 누르면 슬랙이 등록된 URL로 POST 요청을 보내온다.
슬랙이 보낸 POST 바디에는 클릭한 유저의 정보, 채널 정보, 타임스탬프 등이 들어 있다.
바디를 파싱해서 필요한 작업을 처리하고 다시 슬랙에 POST 요청을 보낸다.

### REQUIRE
1. 슬랙 앱에 Interactive Components 기능 등록
2. Public URL
3. POST 요청 처리

> node.js로 진행한다.
> 패키지는 axios, express, body-parser를 사용했다.

#### Interactive Componenets
- 슬랙에서 Create App에 진입한다.
- 6가지 Features가 있다. 여기서는 Interactive Components를 활성화한다.
- Interactivity를 On 하면, `Request URL`을 등록해야 한다.
- `Request URL`은 `PUBLIC URL`이어야 한다.
- Actions에서 필요한 권한을 설정한다. ex 채널 메시지, 채널 초대, 그룹 구성...

#### Public URL
서버가 이미 구성되어 있으면(DNS를 포함한) 문제가 없으나 개발환경에는 대부분 없다.
`ngrok` [링크](https://ngrok.com/)이라는 서비스를 활용해봤다.
`ngrok`은 임시 `Public URL`을 만들어주고, 해당 URL을 localhost:xxxx로 포워딩해준다.
링크에서 파일 다운로드후 설치한다. 윈도우라면 프로그램 설치 화면이다. 유닉스라면 프로젝트 폴더에서 binary파일로 쓰면 된다.
우선 authtoken을 발급받아야 한다.  

```bash
$ ./ngrok authtoken <AUTH_TOKEN>
```

```bash
$ ./ngrok http[s] [port]
```
화면에 나오는 임시 url이 입력한 port로 포워딩된다.

#### POST 요청 처리
인터랙티브 컴포넌트를 우선 게시해야 사이클이 시작된다. 버튼을 제공해야 뭘 하든 말든 할 테니까.
**버튼 구성 JSON**은 [링크](https://api.slack.com/messaging/interactivity#buttons)에서 확인할 수 있다.

```js
const axios = require('axios')
const message = require('./buttons.json')
axios.post(슬랙_포스트_URL, message)
     .then(res => console.log("success"))
     .catch(err => console.log(err))
```
슬랙 url에 버튼이 포함된 메시지를 POST 요청했다. 
자, 이제 누군가 슬랙에서 버튼을 누르면 POST 요청이 들어온다.
POST 요청부터 확인해보자.

```js
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: treu }))
app.use(bodyParser.json())
app.post(퍼블릭_URL_리소스_부분, (req,res) =>{
    console.log(req.body); //슬랙에서 보낸 POST 확인
    res.send({data : "something"});
} )
```

POST 바디 구조를 보았다면, 필요한 정보를 파싱해서 처리하면 된다.
버튼을 클릭한 유저의 아이디를 특정 채널에 게시해본다.

```js
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: treu }))
app.use(bodyParser.json())
app.post(퍼블릭_URL_리소스_부분, (req,res) =>{
    res.setStatus(200);
    axios.post(메시지_등록_URL, req.body.user_id)
         .then(res => console.log("success"))
         .catch(err => console.log(err))
} )
```
참 쉽쥬?