import "dotenv/config";
import express from "express";
import { connectDb } from "./config/db.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDb();
    console.log(`Sever started at http://localhost:${PORT}`);
});
