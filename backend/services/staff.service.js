import mongoose from "mongoose";
import Staff from "../db/staff.model.js";
import utils from "../utils/index.js";
import ValidationError from "../utils/ValidationError.js";
import NotFoundError from "../utils/NotFoundError.js";

const create = async (req) => {
    const staffFromReqBody = req.body;
    if (req.file) {
        staffFromReqBody.image = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        };
    }
    const staffToSave = new Staff(staffFromReqBody);
    const validationResult = staffToSave.validateSync();
    if (validationResult) {
        throw new ValidationError(
            "Staff validation failed",
            utils.getInvalidFields(validationResult)
        );
    }

    return await staffToSave.save();
};

const getAll = async () => {
    return await Staff.find({});
};

const getAllWithPagination = async (page, pageSize) => {
    const staffs = await Staff.aggregate([
        {
            $facet: {
                metadata: [{ $count: "totalCount" }],
                data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
            },
        },
    ]);
    if (staffs[0].data.length === 0) {
        throw new NotFoundError("Staff list not found.");
    }
    return {
        metadata: {
            totalCount: staffs[0].metadata[0].totalCount,
            page,
            pageSize,
        },
        data: staffs[0].data,
    };
};

const update = async (req) => {
    const { id } = req.params;
    const staff = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid staff id.");
    }

    return await Staff.findByIdAndUpdate(id, staff, {
        new: true,
    });
};

const remove = async (req) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid staff id.");
    }

    await Staff.findByIdAndDelete(id);
};

const getStaffWithId = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ValidationError("Invalid staff id.");
    }
    const StaffFound = await Staff.findById(id);
    if (!StaffFound) {
        throw new NotFoundError(`Staff has id: ${id} not found.`);
    }
    return StaffFound;
};

const getDepartmentList = async () => {
    const departmentList = await Staff.distinct("department");
    if (departmentList.length === 0) {
        throw new NotFoundError("Departments not found.");
    }
    return departmentList;
};

export default {
    create,
    update,
    remove,
    getAll,
    getAllWithPagination,
    getStaffWithId,
    getDepartmentList,
};
