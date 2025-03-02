import express from "express";
import { staffController } from "../controllers/index.js";

const router = express.Router();

router.get("/staffs", staffController.getAllStaff);
router.get("/staffs/pagination", staffController.getAllStaffWithPagination);
router.post("/staffs", staffController.createStaff);
router.put("/staffs/:id", staffController.updateStaff);
router.delete("/staffs/:id", staffController.removeStaff);

export default router;
