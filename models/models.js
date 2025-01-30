const mongoose = require("mongoose");

const userShema = new mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      email: String,
      password: String,
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );
  
  module.exports= mongoose.model("userDetails", userShema);