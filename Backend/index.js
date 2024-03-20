import express from "express";
import { prisma } from "./config/prisma.config.js";
import authRoute from "./route/auth.js";
import productRoute from "./route/Products.js";
import cors from "cors";
const app = express();

app.use(cors())
app.use(express.json());

const prismaConnection = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to database.");
    } catch (error) {
        console.log("Error connecting to database.", error
        );
    }

}



app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
    res.send("Welcome .");
})
app.listen(8800, () => {
    prismaConnection()
    console.log("Connected to backend.on 8800");
});