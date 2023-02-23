const express = require("express")
require("dotenv").config();
const {connection} = require("./configs/db");
const {userRouter} = require("./routes/User.route");
const {flightRouter} = require("./routes/Flight.route");
const {bookingRouter} = require("./routes/Booking.route");
const {authenticate} = require("./middlewares/authenticate.middleware");
const cors=require("cors");
const app = express();

app.use(cors({
  origin:"*"
}))
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to Air Ticket Booking System!");
});


app.use("/users", userRouter);
app.use(authenticate);
app.use("/flights", flightRouter);
app.use("/booking", bookingRouter);

app.listen(8080, async()=>{
  try {
    await connection
    console.log("Connected to DB")
  } catch (err) {
    console.log("Error connecting to DB")
    console.log(err)
  }
  console.log("server is running on port 8080");
})

/*
{
  "name":"harsha",
  "email":"harsha@gmail.com",
  "password":"harsha"
}

{
  "email":"harsha@gmail.com",
  "password":"harsha"
}
{
  "mssg": "Login successfull",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzcxMzcwMTZ9.RmRMh_3drfmgo2GDx2c8Aab93xqhyBk3obzh5iH-kCk"
}

/post flight
{
    "airline": "airindia",
    "flightNo": "3",
    "departure": "calcutta",
    "arrival": "bangalore",
    "departureTime": "1975-08-19T23:15:30.000Z",
    "arrivalTime": "1975-08-19T23:15:30.000Z",
    "seats": 24,
    "price": 10999
}
{
    "user": "63f7146936a64565f243fd38",
    "flight": "63f719d4e68a1cdaf29e8e4d"
}
[
  {
    "_id": "63f725a7667b8e7e3fe343dd",
    "user": "63f7146936a64565f243fd38",
    "flight": "63f719d4e68a1cdaf29e8e4d",
    "__v": 0
  }
]
*/