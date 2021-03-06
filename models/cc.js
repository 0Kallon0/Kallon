const mongoose = require("mongoose");

module.exports = mongoose.model('cc', new mongoose.Schema({
  Guild: String,
  Command: String,
  Response: String
}));