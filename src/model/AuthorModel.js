const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://libraryuser:7b53HnRn9J9Zq6a@cluster0.yz2ioso.mongodb.net/?retryWrites=true&w=majority"
);
const Schema = mongoose.Schema;

const NewSchema = new Schema({
  id: Number,
  title: String,
  slug: String,
  biography: String,
});

const Authordata = mongoose.model("authors", NewSchema);

module.exports = Authordata;
