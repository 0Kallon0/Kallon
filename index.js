const { Client, Collection, Message, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');
const client = new Discord.Client

client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map();
client.mongoose = require('./utils/mongoose');

client.categories = fs.readdirSync('./🤖 Commands/');

config({
    path: `${__dirname}/.env`
});

client.on("ready", async () => {
    console.log("Bot en ligne ✅")
    client.user.setStatus("online");
    const statuser = [
      () => `.help | ${client.guilds.cache.size} serveurs 📟`,
      () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs 💎`,
      () => `Version 0.0.2 💻`,
    ]
    let i = 0
    setInterval(() => {
      client.user.setActivity(statuser[i](), {type: 'WATCHING'});
      i = ++i % statuser.length
    }, 1e4);
});

['handler'].forEach(handler => {
    require(`./utils/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        client.on(evtName, evt.bind(null, client));
    });
});

client.mongoose.init();
client.login(process.env.TOKEN);