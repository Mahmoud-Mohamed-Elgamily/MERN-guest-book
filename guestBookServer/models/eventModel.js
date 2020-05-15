let mongoose = require('mongoose');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

let userSchema = new mongoose.Schema({
  _id: ObjectId ,
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: ObjectId, required: true, ref: 'user' },
  replies: [{ type: ObjectId, ref: "reply" }],
});

userSchema.plugin(autoIncrement.plugin, 'speakers');
let usersModel = mongoose.model("event", userSchema);