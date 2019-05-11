const axios = require('axios')
const token = require('./api_info').token

axios.post('https://slack.com/api/channels.delete',{
    "token": token,
    "channel": "CJL4EQUDS"
})
    .then((res) => {
    console.log(res);
})
.catch((err) =>{
    console.log(err);
})