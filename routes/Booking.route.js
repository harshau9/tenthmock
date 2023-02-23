const { query } = require("express");
const express = require("express");
const bookingRouter = express.Router();
const { BookingModel } = require("../models/Booking.model");

bookingRouter.get("/dashboard",async (req,res)=>{
  try {
    const booking = await BookingModel.find();
    if (booking.userID === req.body.userID) {
      return res.status(200).send(booking);
    } else {
      return res.send("You are not authorized");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
})
bookingRouter.post("/",async (req,res)=>{
  const payload=req.body;
  try {
    const new_booking = new BookingModel(payload);
    await new_booking.save();
    res.status(201).send("booked flight successfully");
  } catch (err) {
    console.log(err)
    res.send({"msg":"Something went wrong"})
  }
});

module.exports = {
  bookingRouter
}