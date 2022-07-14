const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  recoList: [{ type: mongoose.Schema.Types.ObjectId, ref: "recos" }],
  followed: [String],
  followers: [String],
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
