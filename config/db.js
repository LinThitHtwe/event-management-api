require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
    });
    console.log("Db connection connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
