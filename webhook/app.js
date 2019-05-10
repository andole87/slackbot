const axios = require('axios')
const api_info = require('./api_info')
const message = require('./post_data')

axios.post(api_info.url, message)
.then((res) => {
    console.log(`status: ${res.statusCode}`)
})
.catch((error) => {
    console.error(error)
})
