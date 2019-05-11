## slack bot

bot은 `interaction`이 가능하다. `Incoming Webhook`은 단순 메시지 `post`만 가능했다. 물론 스케줄링을 사용, 주기적으로 메시지를 포스트하거나, 이벤트를 연결해서 동작하게 할 수 있다. 하지만 외부 서버가 필요하거나 실시간으로 처리하기 어렵다는 단점이 있다.

`bot`은 slack 내부에서 제공하는 `interaction`이 가능한 app이다.

## Configuration

####  Scope

bot은 Scope라는 속성이 있다. 권한과 비슷하게 이해했다. Scope에는 Administrator, channel.write, channel.read 등 여러 세그먼트들이 있다. 활용할 기능에 따라 최소한의 Scope를 부여하는게 좋겠다.



#### Token

bot은 Scope를 변경할 때마다 **ReInstall, Authorize** 를 진행해야 한다. ReInstall 후에는 갱신된 bot Token이 발급된다.



#### Method

[슬랙 메소드](<https://api.slack.com/methods>) 에서 제공하는 Method, 필요 Scope를 확인할 수 있다. 관심가는 Method의 링크를 타면 Method를 테스트할 수 있고 Message를 빌드할 수도 있다.



## Slackbots

slack bot을 쉽게 핸들링하기 위해 추상화된 api가 언어별로 존재한다. Github에서 검색하면 많이 나온다.

Node.js 환경에서 쓸 `slackbots`을 사용했다. [Github 링크](https://github.com/mishk0/slack-bot-api)  프로젝트 폴더에서 `slackbots`를 추가해주면 된다.

```bash
$ npm install slackbots
```

Slackbots는 이벤트 바인딩 형식으로 사용할 수 있다.

- **start** - Messaging API가 활성화되면 이벤트 발생.
- **message** - 슬랙에서 봇에게 무언가를 했을 때(ex 말을 걸거나) 발생. ex) @bot hello
- **open** - 웹소켓이 열리고 통신이 준비되었을 때 발생.
- **close** - 웹소켓 연결이 닫혔을 때 발생.
- **error** - **슬랙에 연결을 시도할 때** 에러가 있으면 발생.



#### sample

```js
app.js

var SlackBot = require('slackbots');

var bot = new SlackBot({
    token: '봇_토큰',
    name: '봇_이름'
});

// 봇이 시작될 때
bot.on('start', function() {
    var params = { // params에 attaches를 담으면 된다
        icon_emoji: ':fire:'
    };
    
    // 채널에 메시지 남기기
    bot.postMessageToChannel('채널이름', '급식체봇이 깨어났다!', params);
    
    // 유저에게 DM 남기기
    bot.postMessageToUser('유저이름', '아무도 날 막을 순 없으셈ㅋㅋ', params); 
	}); 
});

// 봇에게 특정 메시지를 보낼 때

bot.on('message', (data) => {
    if(data.type !== 'message'){ // 봇에게 말을 거는거 아니면 리턴
        return;
    }
    
    // 봇에게 말한 내용을 체크. 정규표현식 권장.
    // !CAUTION! 맨 앞 공백을 추가해야 한다.
    if(data.text === ' 인정?'){ // 봇에게 말한 내용이 "인정?" 일 경우.
        bot.postMessageToChannel('채널이름', '어 인정');
    }
})

bot.on('error', (err) => {
    bot.postMessageToChannel('채널이름', '엄크발생!')
})
```

app.js를 실행하면 **start**이벤트에 등록된 콜백이 실행된다.

봇에게 "인정?"이라고 말하면 봇이 "어 인정"이라고 말한다. @봇_이름 인정?