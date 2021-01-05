const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = {
    name: 'prefix',
    category: 'admin',
    description: 'Sets the prefix for this server.',
    usage: `prefix <newPrefix>`,
    run: async (client, message, args) => {
        message.delete();

        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send('Vous n\'êtes pas autorisé à utiliser cette commande !').then(m => m.delete({timeout: 10000}));
        };

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send('Ce serveur n\'était pas dans notre base de données! Nous l\'avons ajouté, veuillez retaper cette commande.').then(m => m.delete({timeout: 10000}));
            }
        });

        if (args.length < 1) {
            return message.channel.send(`Vous devez spécifier un préfixe à définir pour ce serveur! Votre préfixe de serveur actuel est \`${settings.prefix}\``).then(m => m.delete({timeout: 10000}));
        };

        await settings.updateOne({
            prefix: args[0]
        });

        return message.channel.send(`Votre préfixe de serveur a été mis à jour pour \`${args[0]}\``);
    }
}