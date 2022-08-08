const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://libraryuser:7b53HnRn9J9Zq6a@cluster0.yz2ioso.mongodb.net/LibraryApp2?retryWrites=true&w=majority"
);
const Schema = mongoose.Schema;

const NewSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

const Userdata = mongoose.model("users", NewSchema);

module.exports = Userdata;
