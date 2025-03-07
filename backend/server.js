import "dotenv/config";
import express from "express";
import { connectDb } from "./config/db.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

app.listen(PORT, () => {
    connectDb();
    console.log(`Sever started at http://localhost:${PORT}`);
});
