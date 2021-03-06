const GuildModel = require("../models/welcomeLeave")
const { MessageEmbed, MessageAttachment } = require("discord.js")
const Levels = require('discord-xp')
const canvas = require('discord-canvas')

module.exports = async (client, member) => {
    const guild = await GuildModel.findOne({
        GuildID: member.guild.id,
    })
    //let botRole = guild.botRole;
    let autoRole = guild.autoRole;
    const user = client.users.cache.get(member.id)
    if(autoRole === null) return;
    let welcomeChannel = guild.leaveChannelId
    if(!welcomeChannel && guild.leaveChannelId === null) return;
    let image = await new canvas.Goodbye()
    .setUsername(`${user.username}`)
    .setDiscriminator(`${user.discriminator}`)
    .setGuildName(`${member.guild.name}`)
    .setMemberCount(`${member.guild.members.cache.size}`)
    .setAvatar(user.displayAvatarURL({ dynamic: true, format: "png" }))
    .setColor("border", "#24445C")
    .setBackground("https://cdn.discordapp.com/attachments/610230033122066442/812409809704976394/1bWD6s.png")
    .toAttachment();

    let attachment = new MessageAttachment(
        image.toBuffer(),
        "goodbye-image.png"
    )
    if(welcomeChannel !== null) {
        client.channels.cache.get(welcomeChannel).send(attachment)
    }
}