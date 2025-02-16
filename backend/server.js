import "dotenv/config";
import express from "express";
import { connectDb } from "./config/db.js";
import staffService from "./services/staff.service.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

const { create, update, remove, getAll } = staffService;
app.post("/staffs", create);
app.put("/staffs/:id", update);
app.delete("/staffs/:id", remove);
app.get("/staffs", getAll);

app.listen(PORT, () => {
    connectDb();
    console.log(`Sever started at http://localhost:${PORT}`);
});
