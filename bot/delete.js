const axios = require('axios')

axios.post('https://slack.com/api/channels.delete',{
    "token":"token",
    "channel":"CJL4EQUDS"
})
.then((res) => {
    console.log(res);
})
.catch((err) =>{
    console.log(err);
})