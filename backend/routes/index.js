import express from "express";
import { staffController } from "../controllers/index.js";
// import { createStaffMulterConfig } from "../utils/multerConfigs.js";
import utils from "../utils/index.js";

import { staffValidatorToCreate } from "../utils/validations/staff.validations.js";

const router = express.Router();

router.get("/staffs", staffController.getAllStaff);
router.get("/staffs/pagination", staffController.getAllStaffWithPagination);
router.get("/staffs/:id", staffController.getStaffWithId);
router.post(
    "/staffs",
    utils.getMulterForCreateStaff().single("image"),
    staffValidatorToCreate,
    staffController.createStaff
);
router.put("/staffs/:id", staffController.updateStaff);
router.delete("/staffs/:id", staffController.removeStaff);

router.get("/departments", staffController.getDepartmentList);

export default router;
