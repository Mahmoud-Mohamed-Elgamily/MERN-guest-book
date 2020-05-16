let mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

let userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  events_id: [{type: ObjectId ,ref:'event'}],
  replies_id: [{type: ObjectId ,ref:'reply'}],
});

let User = mongoose.model("user", userSchema);