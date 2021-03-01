// This is a small discord bot to make a cappottone online, as in a true IFSA tradition


const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config-secrets.json');


const cap_username = "Cappottone";
const cap_gif_url = 'https://cdn.discordapp.com/attachments/779010777272549428/779436533677424730/cappottone_serm.gif';
const cap_emoji = "🤗" // this is an unicode hugging face emoji. Your font may not show it but it is there :)


client.once('ready', ()=> client.user.setUsername(cap_username))
client.on('message', (message) => {
    if (message.author.id !== client.user.id && message.content.match(/cappottone/ig)){
        let victims = message.mentions.users.filter(user => user.id !== client.user.id) // remove the bot from the mentions
        if (victims.size > 0){
            sendCap(message, victims);
        }
        else{
            message.reply("Please mention @someone to make a cappottone");
        }
    }
});


cap_base = new Discord.MessageEmbed()
    .setColor("#006633")
    .setTitle('A remote cappottone is underway! :mega:')
    .setImage(cap_gif_url);


function sendCap(message, victims){

    const msg = new Discord.MessageEmbed(cap_base)
        .setDescription(`<@${message.author.id}> is making a nice warm remote cappottone to <@${victims.first().id}>`)

    message.channel.send(msg)
        .then((m)=> {
            console.log(`sending a cappottone to ${victims.first().username}`);
            m.react(cap_emoji);
            addListener(m);
        })
        .catch(console.error)
}

function filterCapReaction(reaction, user){
    return reaction.emoji.name === cap_emoji && user.id !== client.user.id
}

function addListener(message){
    let collector = message.createReactionCollector(filterCapReaction)
    collector.on('collect', (reaction, user) => {
        updateCap(message, user);
    });

    collector.on('end', collected => {
        console.log(`Cappottone reaction ended`);
    });
}

function updateCap(message, user) {
    const prev_descr = message.embeds[0].description;
    let new_descr = `<@${user.id}>, ` + prev_descr;
    console.log(user.username)
    if (new_descr.match(/is/ig)){ // This means that is the first run, so need to add the plural
        new_descr = new_descr.replace("is", "are"); // going plural
        new_descr = new_descr.replace(", ", " and "); // add an `and` in front as the list of name is growing from the beginning
    }

    let newEmbed =  new Discord.MessageEmbed(cap_base)
        .setDescription(new_descr)
    message.edit(newEmbed)
}

// Run the bot
client.login(config.token)
    .catch(console.error);


