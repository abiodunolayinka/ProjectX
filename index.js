const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/user");
  console.log("connected to database");
  console.log("connected to database");
};
connectDB();

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

const userDetails = mongoose.model("userDetails", userShema);

app.post("/signUp", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = new userDetails({ firstName, lastName, email, password });
    await user.save();
    return res
      .status(201)
      .json({ sucess: true, message: "sign up sucessfully", data: user });
  } catch (error) {
    console.log(error);
  }
});

app.put("/update/:id", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const UpdateUser = await userDetails.findByIdAndUpdate(
      { _id: req.params.id },
      { firstName, lastName, email, password },
      { new: true }
    );
    return res
      .status(200)
      .json({ sucess: true, message: "User updated", data: UpdateUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ sucess: false, message: error.message });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userDetails.findOne({ email, password });
    if (user) {
      return res.status(200).json({ sucess: true, message: "login sucess" });
    } else {
      return res.status(400).json({ sucess: false, message: "login failed" });
    }
  } catch (error) {
    console.log(error);
  }
});
app.delete("/delete/:id", async (req, res) => {
  try {
    await userDetails.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: "User deletion failed" });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log that the server is running
});
