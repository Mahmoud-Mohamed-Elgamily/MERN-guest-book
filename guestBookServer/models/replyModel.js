let mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

let replySchema = new mongoose.Schema({
  _id: ObjectId ,
  reply: { type: String, required: true },
});

module.exports = mongoose.model("reply", replySchema);