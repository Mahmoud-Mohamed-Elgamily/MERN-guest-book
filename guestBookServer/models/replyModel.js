let mongoose = require('mongoose');

let replySchema = new mongoose.Schema({
  reply: { type: String, required: true },
});

module.exports = mongoose.model("reply", replySchema);