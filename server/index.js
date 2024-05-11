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
const app = express();

const corseConfig = {
    origin: '',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
}


dotenv.config()
app.use(express.json())
app.options('', cors(corseConfig))
app.use(cors(corseConfig))


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

app.get("/", (req, res) => {
    res.send("Welcome .");
})
app.listen(8800, () => {
    DataBaseConnection()
    console.log("Connected to backend.on 8800");
});
app.setTimeout(50000);