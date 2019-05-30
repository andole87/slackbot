const axios = require('axios')
const api = require('./api_info')
const message = require('./message_format')

function getSheet() {
    axios.get(api.sheet_url)
        .then((res) => {
            const index = Math.floor(Math.random() * (res.data.values.length + 1));
            const item = res.data.values[index];
            message.form[1].text.text = item[1] + "\n" + item[7];
            message.form[1].accessory.image_url = item[6];
            message.form[3].text.text = "*" + item[2] + " *\n 좋은점: " + item[3] +
                "\n 가격대: " + item[4]
            console.log(JSON.stringify(message.form))
            return axios.post(api.slack_url, {
                blocks: JSON.stringify(message.form)
            })
        })
        .catch(err => {
            // console.log(err);
            axios.post(api.slack_url, {
                "text": "오류 발생!"
            })
                .then(r => console.log("에러처리"))
                .catch(e => console.log("심각"))
        })
}
module.exports.getSheet = getSheet;