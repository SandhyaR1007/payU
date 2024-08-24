const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/payU");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
