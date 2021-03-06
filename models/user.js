const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    user_id: String,
    userID: String,
    warnings: Array,
    muteCount: Number,
    warnCount: Number,
    kickCount: Number,
    banCount: Number,
});

module.exports = mongoose.model('Users', userSchema, 'users');