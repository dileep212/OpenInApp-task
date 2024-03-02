const { mongoose } = require("mongoose");

const monogUrl =
  "mongodb+srv://dileepm:openInApp@cluster0.8a2bjar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = () => {
  return mongoose.connect(monogUrl);
};

module.exports = connectDB;
