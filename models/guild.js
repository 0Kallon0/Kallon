const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    guildID: String,
    guildName: String,
    prefix: String,
    logChannelID: String,
    id: String,
    Current: Number,
    Channel: String,
    levelMessages: { type: Boolean, default: false },
});
module.exports = mongoose.model('Guild', guildSchema, 'guilds');