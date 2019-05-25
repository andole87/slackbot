const express = require('express')
const axios = require('axios')
const api_info = require('./api_info')
const message = require('./post_data')
const bodyParser = require('body-parser')

const app = express()
const parser = bodyParser.urlencoded({ extended: false })

axios.post(api_info.post_url, message)
    .then((res) => {
        console.log(`status: ${res.statusCode}`)
    })
    .catch((error) => {
        console.error(error)
    })

app.post('/button', parser, (req, res) => {
    console.log(req.body)
    res.setHeader('Content-Type', 'application/json');
    res.send({ data: "something" })
})
app.listen(80, () => {
    console.log('opened')
})