## Incoming Webhooks

> 외부 소스를 슬랙에 게시(post)하는 간단한 api.



[슬랙 api 페이지](https://gapi.slack.com/) 에서 몇 단계를 거쳐야 한다.

1. Create App
2. App의 이름과 Workspace를 정해준다.
3. App의 종류를 **Incoming Webhooks**로 정해준다.
4. Add new Webhook to Workspace.
5. 포스트할 채널을 선택한다. (Post to) 
6. Webhook URL 로 **HTTP POST** method를 사용하면 된다.



## 사용법

인증된 webhook url(이하 api_url)로 특정 형식의 JSON을 **HTTP POST**하면 봇이 슬랙에 메시지를 남긴다.

```bash
~$ curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' api_url
```



`Node.js`와 `axios`로 만들 수 있다.

```js
const axios = require('axios')

axios.post(api_url, TO_POST_DATA_JSON)
.then([완료후 실행할 콜백])
.catch([에러시 실행할 콜백])
```



### JSON 바디 형식

#### attached

```js
{
    "text": "슬랙 메시지",
        
        // 추가 정보
    "attachments": [	
        {
            "fallback": "추가정보 요약 문자(필요)",
            "color": "수직 바 색상 (#XXXXXX)",
            "pretext": "추가 정보 위에 표시되는 문자",
            "title": "추가 정보 제목",
            "title_link": "추가 정보 링크",
            "fields": [
                "{
                	// 추가 정보 오브젝트(요소)
                	"title": "요소 제목",
                	"value": "요소 값",
                	"short": true or false
                }"
            ],
            "image_url": "이미지 추가시 url",
            "thumb_url": "썸네일 추가시 url",
            "ts": 타임스탬프
        }
    ]
}
```



#### message button

