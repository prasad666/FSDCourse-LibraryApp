const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);
const Schema = mongoose.Schema;

const NewSchema = new Schema({
  id: Number,
  title: String,
  slug: String,
  biography: String,
});

const Authordata = mongoose.model("authors", NewSchema);

module.exports = Authordata;
