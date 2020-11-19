const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config-secrets.json');

client.once('ready', ()=> client.user.setUsername('Cappottone'))
client.on('message', (message) => {
    if (message.author.id !== client.user.id && message.content.match(/cappottone/ig)){
        let victims = message.mentions.users.filter(user => user.id !== client.user.id)
        if (victims.size > 0){
            message.channel.send(` <@${message.author.id}> is making a nice warm remote cappottone to <@${victims.first().id}>`);
        }
        else{
            message.reply("Please mention @someone to make a cappottone")
        }

    }
});

client.login(config.token);
