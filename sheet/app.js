const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const api_info = require('./api_info')
const slack_url = api_info.slack_url;
const sheet_url = api_info.sheet_url;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/', (req, res) => {
    const message = req.body;
    res.sendStatus(200);
    if (message.event.text === "점심") {
        axios.get(sheet_url)
            .then((res) =>
                axios.post(slack_url, { "text": res.data.values[1][1] })
                    .then(console.log("finished"))
                    .catch((err) => console.log(err)));
    }
})
app.listen(80)