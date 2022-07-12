const mongoose = require("mongoose");

const recoSchema = mongoose.Schema({
  category: String,
  title: String,
  APIid: Number,
  link: String,
  imageUrl: String,
  usersList: [String],
});

const recoModel = mongoose.model("recos", recoSchema);

module.exports = recoModel;
