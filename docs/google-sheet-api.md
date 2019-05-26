## Google Sheet
>구글 API v4가 Sheet CRUD를 제공한다.

### REQUIRE
1. Sheet API 등록
2. 구글 시트 공유 범위 설정

### Sheet API
[Google Api Center](https://console.developers.google.com/apis/dashboard) 에서 새로운 API를 만들 수 있다.
구글이 제공하는 API는 매우 방대한데다, GCP와 통합되어 있다. 그래서 API를 프로젝트별로 구분하고 있다.
즉 API를 등록하려면 프로젝트를 생성하고 그 하위에 API를 등록해야 한다.

새 프로젝트를 적당히 만들고 API 라이브러리로 가자.  
라이브러리에서 Sheet를 검색하면 Sheet API가 나온다.   
Sheet API를 사용 설정하고 사용자 인증 정보로 이동한다.

여기서,
- 공유하지 않을 시트에 대한 API라면 OAuth가 필요하다.
- 공유할 sheet에 대한 API라면 단순 API KEY만 있어도 가능하다.

인증 정보를 구성하면 키를 발급해준다. 이 API 키와 Sheet ID를 포함한 URL에 GET 요청하면 내용을 JSON으로 받을 수 있다.
```bash
$ curl -X GET https://sheets.googleapis.com/v4/spreadsheets/구글시트_아이디/values/시트이름!셀_범위&구글_API_KEY
```
> 구글 시트에 들어가면 주소창에 URL이 ~spreadsheets/d/[시트아이디]/edit 형식으로 보인다. 
> 셀 범위는 A!형식으로 표현한다. 엑셀이랑 같다.

Node.js로 뭔가를 만들어보자.
```js
const axios = require('axios')
const sheet_id = "구글_시트_아이디"
const api_key = "구글_API_KEY"
const url = "https://sheets.googleapis.com/v4/spreadsheets/" + sheet_id + "/values/sheet1!A1:A100?key=" + api_key
const getRandomInt = (max) => {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
}

axios.get(url)
     .then(res => console.log(res.values[getRandomInt(100)]))
     .catch(err => console.log(err))
```
구글시트의 시트1탭의 A1:A100범위의 내용을 랜덤하게 출력한다.
