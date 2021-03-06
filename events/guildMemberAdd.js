const GuildModel = require("../models/welcomeLeave")
const { MessageAttachment } = require("discord.js")
const canvas = require('discord-canvas')

module.exports = async (client, member) => {
    const guild = await GuildModel.findOne({
        GuildID: member.guild.id,
    })
    let botRole = guild.botRole;
    let autoRole = guild.autoRole;
    const user = client.users.cache.get(member.id)
    if(autoRole === null) return;
    let welcomeChannel = guild.welcomeChannelId
    if(!welcomeChannel && guild.welcomeChannelId === null) return;
    let image = await new canvas.Welcome()
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
        "welcome-image.png"
    )
    if(welcomeChannel !== null) {
        client.channels.cache.get(welcomeChannel).send(attachment)
    }
    if(autoRole !== null && !member.user.bot || !autoRole ) {
        member.roles.add(autoRole)
    }
    if(member.user.bot && !botRole) {
        member.roles.add(botRole)
    }
}