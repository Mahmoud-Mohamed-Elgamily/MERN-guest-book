let mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

let eventSchema = new mongoose.Schema({
  _id: ObjectId ,
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: ObjectId, required: true, ref: 'user' },
  replies: [{ type: ObjectId, ref: "reply" }],
});

module.exports = mongoose.model("event", eventSchema);