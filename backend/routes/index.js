import express from "express";
import { staffController } from "../controllers/index.js";
import { validate } from "../middlewares/validate.js";
import utils from "../utils/index.js";

import {
    staffValidatorToCreate,
    pageValidatorForGetAllStaffWithPagination,
    staffValidatorToUpdate,
    idValidator,
} from "../validations/staff.validation.js";

const router = express.Router();

router.get("/staffs", staffController.getAllStaff);
router.get(
    "/staffs/pagination",
    pageValidatorForGetAllStaffWithPagination,
    validate,
    staffController.getAllStaffWithPagination
);
router.get(
    "/staffs/:id",
    idValidator,
    validate,
    staffController.getStaffWithId
);
router.post(
    "/staffs",
    utils.getMulterForCreateStaff().single("image"),
    staffValidatorToCreate,
    staffController.createStaff
);
router.put(
    "/staffs/:id",
    staffValidatorToUpdate,
    validate,
    staffController.updateStaff
);
router.delete(
    "/staffs/:id",
    idValidator,
    validate,
    staffController.removeStaff
);

router.get("/departments", staffController.getDepartmentList);

export default router;
