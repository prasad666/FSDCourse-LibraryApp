const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);
const Schema = mongoose.Schema;

const NewSchema = new Schema({
  title: String,
  author: String,
  image: String,
  genre: String,
});

const Bookdata = mongoose.model("bookdata", NewSchema);

module.exports = Bookdata;
