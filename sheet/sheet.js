const axios = require('axios')
const url = require('./api_info').sheet_url
axios.get(sheet_url)
    .then((res) => console.log(res.data.values))
    .catch((err) => console.log(err))