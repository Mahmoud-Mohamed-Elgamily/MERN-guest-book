let mongoose = require('mongoose');

autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

let userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  events_id: [{type: ObjectID ,ref:'event'}],
  replies_id: [{type: ObjectID ,ref:'reply'}],
});

userSchema.plugin(autoIncrement.plugin, 'speakers');
let usersModel = mongoose.model("user", userSchema);