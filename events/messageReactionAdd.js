const TicketData = require('../models/TicketData');
const cooldown = new Set();
const {
	MessageEmbed,
	MessageCollector
} = require('discord.js');

module.exports = async (bot, reaction, user) => {
	if (user.bot) return;

	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();

	if (!reaction.message.guild) return;

	const data = await TicketData.findOne({
		GuildID: reaction.message.guild.id
	});
	if (!data) return;
	if (reaction.message.partial) await reaction.message.fetch();

	if (reaction.emoji.name === '🎟' && reaction.message.id === data.MessageID) {
		if (cooldown.has(user.id)) {
			reaction.users.remove(user.id);
			return;
		}
		data.TicketNumber += 1;
		await data.save();
		const channel = await reaction.message.guild.channels.create(`ticket-${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`, {
			type: 'text',
			permissionOverwrites: [{
				id: reaction.message.guild.id,
				deny: ['VIEW_CHANNEL'],
			},],
		});
		await channel.createOverwrite(user, {
			VIEW_CHANNEL: true,
			SEND_MESSAGES: true,
			SEND_TTS_MESSAGES: false
		});
		await channel.createOverwrite(data.WhitelistedRole, {
			VIEW_CHANNEL: true,
			SEND_MESSAGES: true,
			SEND_TTS_MESSAGES: false
		});
		reaction.users.remove(user.id);
		const successEmbed = new MessageEmbed()
			.setTitle(`Ticket #${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`)
			.setDescription(`Ce ticket a été créé par ${user.toString()}.Veuillez dire \`ticket-close\` lorsque vous avez terminé .`)
			.setColor('BLUE');
		let successMsg = await channel.send(`${user.toString()}`, successEmbed);
		await cooldown.add(user.id);
		await checkIfClose(bot, reaction, user, successMsg, channel);
		setTimeout(function () {
			cooldown.delete(user.id);
		}, 10000);
	}
}

async function checkIfClose(bot, reaction, user, successMsg, channel) {
	const filter = m => m.content.toLowerCase() === 'ticket-close'
	const collector = new MessageCollector(channel, filter);

	collector.on('collect', async msg => {
		channel.send(`Cette chaîne sera supprimée dans **10** secondes.`);
		await collector.stop();
		setTimeout(function () {
			channel.delete();
		}, 10000);
	});
}