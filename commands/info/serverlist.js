const { MessageEmbed } = require('discord.js');
const customisation = require('../../customisation.json');

module.exports = {
    name: 'serverlist',
    category: 'info',
    description: 'Returns bot and API latency in milliseconds.',
    usage: `ping`,
    run: async (client, message, args) => {
        const msg = await message.channel.send('🏓 Pinging...');
        serverlist = ''
        client.guilds.forEach((guild) => {
            serverlist = serverlist.concat(" - " + guild.name + ": ID: " + guild.id + "\n")
        })

        const embed = new MessageEmbed()
        .setColor(Math.floor(Math.random()*16777215))
        .setTitle("Servers that have Cryptonix X", '')
        .setDescription(serverlist)
        .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);

        message.channel.send(embed);
        console.log("commandes ping effectué")
    }
}
