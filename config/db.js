const  mongoose  = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/user");
  console.log("connected to database");
//   console.log("connected to database");
};



module.exports= connectDB();