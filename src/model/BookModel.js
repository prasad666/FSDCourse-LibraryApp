const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://libraryuser:7b53HnRn9J9Zq6a@cluster0.yz2ioso.mongodb.net/?retryWrites=true&w=majority"
);
const Schema = mongoose.Schema;

const NewSchema = new Schema({
  title: String,
  author: String,
  image: String,
  genre: String,
});

const Bookdata = mongoose.model("bookdata", NewSchema);

module.exports = Bookdata;
