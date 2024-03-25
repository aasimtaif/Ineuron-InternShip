import express from "express";
import authRoute from "./route/auth.js";
import productRoute from "./route/Products.js";
import CategoryRoute from "./route/Category.js";
import cartRoute from "./route/Cart.js";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();

dotenv.config()
app.use(cors())
app.use(express.json());

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
app.use("/api/products", productRoute);
app.use("/api/categories", CategoryRoute);
app.use("/api/cart", cartRoute);


app.get("/", (req, res) => {
    res.send("Welcome .");
})
app.listen(8800, () => {
    DataBaseConnection()
    console.log("Connected to backend.on 8800");
});