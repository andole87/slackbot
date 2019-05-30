const express = require('express')
const bodyParser = require('body-parser')
const sheet = require('./sheet')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post("/", (req, res) => {
    res.sendStatus(200);
    if (req.body.event.text === "맛집") {
        var a = sheet.getSheet()
    }
})
app.listen(80)