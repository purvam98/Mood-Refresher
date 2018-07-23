const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true }},
  email: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true },
  locations: { type: Array, "default": [] },
  places: { type : Array, "default": [] },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
