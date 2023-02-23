const { query } = require("express");
const express = require("express");
const flightRouter = express.Router();
const { FlightModel } = require("../models/Flight.model");

flightRouter.get("/",async (req,res)=>{
  try {
    const flight = await FlightModel.find();
    if (flight.userID === req.body.userID) {
      return res.status(200).send(flight);
    } else {
      return res.send("You are not authorized");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
})

flightRouter.get("/:id",async (req, res, next)=>{
  const id = req.params.id;
  let flight;
  try {
      flight = await FlightModel.findById(id)
  } catch (error) {
      return console.log(error)
  }
  if (!flight) {
      return res.status(404).json({ message: "No Flight Found" });
  }
  return res.status(200).json({ flight })
})

flightRouter.post("/",async (req,res)=>{
  const payload=req.body;
  try {
    const new_flight = new FlightModel(payload);
    await new_flight.save();
    res.send("created new flight");
  } catch (err) {
    console.log(err)
    res.send({"msg":"Something went wrong"})
  }
});

flightRouter.patch("/:id",async (req,res)=>{
  const payload=req.body;
  const id = req.params.id;
  const flight = await FlightModel.findOne({"_id":id});
  const userID_in_flight = flight.userID;
  const userID_making_req = req.body.userID;
  try {
    if(userID_making_req!==userID_in_flight){
      res.send({"msg": "You are not authorized"})
    }else{
      await FlightModel.findByIdAndUpdate({"_id":id},payload);
      res.send("Updated flight successfully")
    }
  } catch (err) {
    console.error(err)
    res.send({"msg":"Something went wrong"})
  }
})
flightRouter.delete("/:id",async (req,res)=>{
  const id = req.params.id;
  const flight = await FlightModel.findOne({"_id":id});
  const userID_in_flight = flight.userID;
  const userID_making_req = req.body.userID;
  try {
    if(userID_making_req!==userID_in_flight){
      res.send({"msg": "You are not authorized"})
    }else{
      await FlightModel.findByIdAndDelete({"_id":id});
      res.send("Deleted flight successfully")
    }
  } catch (err) {
    console.error(err)
    res.send({"msg":"Something went wrong"})
  }
})

module.exports = {
  flightRouter
}
