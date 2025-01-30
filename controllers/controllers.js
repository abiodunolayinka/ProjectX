const userDetails = require('../models/models');
const express = require('express');
const router = express.Router();

router.post("/signUp", async (req, res) => {
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
  
  router.put("/update/:id", async (req, res) => {
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
  router.put("/changePassword/:id", async(req, res) => {
    const { password } = req.body;
    try {
      const UpdatePassword = await userDetails.findByIdAndUpdate(
        req.params.id,
        {password},
        {new:true}
      )
      return res.status(200).json({success: true, message: "Password updated"})
    }catch(error){
      console.log(error);
      return res.status(500).json({success: false, message: error.message})
    }
  })
  
  router.post("/login", async (req, res) => {
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
  
  router.get("/userDetails/:id", async (req, res) => {
    try {
      const details = await userDetails.findById(req.params.id);
   
      return res.status(200).json({ success: "User found", data:details})
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: "User not found" });
    }
  });
  router.delete("/delete/:id", async (req, res) => {
    try {
      await userDetails.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: "User deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: "User deletion failed" });
    }
  });

  module.exports = router;