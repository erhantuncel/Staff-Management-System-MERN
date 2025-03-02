import express from "express";
import { staffController } from "../controllers/index.js";

const router = express.Router();

router.get("/staffs", staffController.getAllStaff);
router.get("/staffs/pagination", staffController.getAllStaffWithPagination);
router.get("/staffs/:id", staffController.getStaffWithId);
router.post("/staffs", staffController.createStaff);
router.put("/staffs/:id", staffController.updateStaff);
router.delete("/staffs/:id", staffController.removeStaff);

router.get("/departments", staffController.getDepartmentList)

export default router;
