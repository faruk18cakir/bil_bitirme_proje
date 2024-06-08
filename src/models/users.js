const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    role: String,
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
