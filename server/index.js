import express from "express";
import authRoute from "./route/auth.js";
import productRoute from "./route/Products.js";
import CategoryRoute from "./route/Category.js";
import cartRoute from "./route/Cart.js";
import orderRoute from "./route/Order.js";
import userRoute from "./route/user.js";
import cors from "cors";
import paymentRoute from "./route/Payment.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
import fetch from "node-fetch"
const app = express();



dotenv.config()
app.use(express.json())
app.use(cors())
app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


const DataBaseConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to database.");
    } catch (error) {
        console.log("Error connecting to database.", error
        );
    }

}



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", CategoryRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);

setInterval(() => {
    fetch('https://ineuron-internship.onrender.com') // Replace with your actual Render app URL where your Express server is hosted
      .then(() => console.log('Ping successful'))
      .catch((err) => console.error('Ping failed:', err));
  }, 13 * 60 * 1000); 
app.get("/", (req, res) => {
    res.send("Welcome .");
})
app.listen(8800, () => {
    DataBaseConnection()
    console.log("Connected to backend.on 8800");
});