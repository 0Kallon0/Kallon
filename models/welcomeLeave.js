const { Schema, model } = require('mongoose')

module.exports = model(
    "Config",
    new Schema({
        GuildID: String,
        welcomeChannelId: String,
        leaveChannelId: String,
        autoRole: String,
        botRole: String,
        membercountChannel: String,
    })
)