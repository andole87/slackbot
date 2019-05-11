const Bot = require('slackbots');
const axios = require('axios')
const apiToken = require('./api_info').token

const bot = new Bot({
    token: apiToken,
    name: 'bottest'
});

const say = function(){
    axios.get('http://api.icndb.com/jokes/random')
    .then((res) => {
        const text = res.data.value.joke;
        bot.postMessageToChannel('general',text)
    })

}
const handleMessage = function(message){
    if(message.includes(' joke')){
        say();
    }
}

bot.on('start', () =>{
    var params = {
        icon_emoji: ':fire:'
    }

    bot.postMessageToChannel('general', "Ready to serve, @andole87", params);;
});

bot.on('error', (err) => console.log(err));

bot.on('message', (data) => {
    if(data.type !== 'message'){
        return;
    }
    handleMessage(data.text);
})

