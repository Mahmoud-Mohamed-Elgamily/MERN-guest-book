let mongoose = require('mongoose');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

let userSchema = new mongoose.Schema({
  _id: ObjectId ,
  reply: { type: String, required: true },
});

userSchema.plugin(autoIncrement.plugin, 'speakers');
let usersModel = mongoose.model("event", userSchema);