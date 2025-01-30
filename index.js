const express = require("express");
const morgan = require("morgan");
// const mongoose = require("mongoose");
const app = express();
const port = 4000;
const connectDB = require("./config/db");
const userRouter = require("./controllers/controllers");

app.use(morgan("dev"));
app.use(express.json());


app.use('/api/v1', userRouter)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
