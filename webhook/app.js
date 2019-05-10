const axios = require('axios')
const api_info = require('./api_info')

axios.post(api_info.url, {
    "text":"Ready to serve, Master."
})
.then((res) => {
    console.log(`status: ${res.statusCode}`)
    console.log(res)
})
.catch((error) => {
    console.error(error)
})
