// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  priority: {
    type: Number,
    enum: [0, 1, 2],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
