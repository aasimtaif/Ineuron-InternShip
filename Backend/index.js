import express from "express";
import authRoute from "./route/auth.js";
import productRoute from "./route/Products.js";
import CategoryRoute from "./route/Category.js";
import cors from "cors";
import mongoose from "mongoose";
const app = express();

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

app.get("/", (req, res) => {
    res.send("Welcome .");
})
app.listen(8800, () => {
    DataBaseConnection()
    console.log("Connected to backend.on 8800");
});