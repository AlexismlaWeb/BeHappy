const mongoose = require("mongoose");

const recommendationSchema = mongoose.Schema({
  name: String,
  type: String,
  link: String,
  urlToImage: String,
  usersLikes: [String],
});

const userModel = mongoose.model("recommendations", recommendationSchema);

module.exports = recommendationModel;
