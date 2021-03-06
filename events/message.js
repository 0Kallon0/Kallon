const mongoose = require('mongoose');
const { MessageEmbed } = require("discord.js");
const Guild = require('../models/guild');
const Levels = require("discord-xp");
const schema = require('../models/cc');

module.exports = async (client, message) => {
    if (message.author.bot || message.channel.type === "dm") return;
    if (message.guild === null) return;
    const settings = await Guild.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        if (err) console.error(err)
        if (!guild) {
            const newGuild = new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                guildName: message.guild.name,
                prefix: process.env.PREFIX,
                logChannelID: null
            })

            newGuild.save()
            .then(result => console.log(result))
            .catch(err => console.error(err));

            return message.channel.send(new MessageEmbed().setColor(process.env.COLOR).setDescription(`Ce serveur n\'était pas dans notre base de données! Nous avons maintenant ajouté et vous devriez pouvoir utiliser les commandes de bot.`)).then(m => m.delete({timeout: 10000}));
        }
    });
    
    if(message.channel.type === "dm") return;
    if(message.author.id === client.user.id || message.author.bot) return;

    const randomAmountOfXp = Math.floor(Math.random() * 4) + 1;

    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      message.channel.send(`Félicitations ${message.author} ! Tu es passé niveau **${user.level}** ! :tada:`).then(m => m.delete({timeout: 5000}));
    }

   const prefix = settings.prefix;

   let args = message.content.slice(prefix.length).trim().split(/ +/g);
   let cmd = args.shift().toLowerCase();
   
   if(cmd.length == 0 ) return;
   const data = await schema.findOne({ Guild: message.guild.id, Command: cmd });
   if(data) message.channel.send(data.Response);

   if (message.content.startsWith(prefix)) {
       let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))

       if (commandFile) {
           commandFile.run(client, message, args)
       }
    }
};