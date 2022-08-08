const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);
const Schema = mongoose.Schema;

const NewSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

const Userdata = mongoose.model("users", NewSchema);

module.exports = Userdata;
