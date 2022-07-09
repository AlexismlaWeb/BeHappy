var mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 5000,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(
  "mongodb+srv://admin:rni21y8Ce6KvuNFX@behappy.x8dez.mongodb.net/?retryWrites=true&w=majority",
  options,
  function (err) {
    console.log(err);
  }
);

module.exports = mongoose;
