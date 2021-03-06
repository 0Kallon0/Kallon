const Discord  = require('discord.js');
module.exports = async (client, guild, message) => {
    const webhook = new Discord.WebhookClient('798891013833621534','CDOKrZ5B-y_qExc4AxytALUUzAvloz3s4WrFR37bfocB5-75F-NCYNU-w02PInsHOHBE')
      
    let serverTag = guild.name
    let memberCount = guild.memberCount 
    let serverOwner = guild.owner 
    let serverLogo= guild.iconURL()
    
    const embed = new Discord.MessageEmbed() 
    .setColor('#0fff00')
    .setTitle('✅ Server Added') 
    .setThumbnail(serverLogo)
    .addField(":ledger: - Name",`${serverTag}`) 
    .addField(":crown: - Owner",`${serverOwner}`)
    .addField(':busts_in_silhouette: - Utilisateur :', `**${memberCount}** `)
    .addField(`Invite le Bot:`,`[Lien D'invitation](https://discord.com/oauth2/authorize?client_id=749366088306917406&scope=bot&permissions=8)`)  
    
      webhook.send({
     username: 'EvoryBot',
     avatarURL:'https://media.discordapp.net/attachments/745709789933207622/746370526171103292/607486.jpg',
    embeds: [embed],
   });
   console.log(`✅ Add: ${serverTag} par ${serverOwner} avec ${memberCount} Membres`)
};