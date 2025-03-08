import mongoose from "mongoose";
import Staff from "../db/staff.model.js";
import utils from "../utils/index.js";
import ValidationError from "../utils/ValidationError.js";
import NotFoundError from "../utils/NotFoundError.js";

const create = async (staffObjectToSave) => {
    const staffToSave = new Staff(staffObjectToSave);
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

const update = async (id, newStaffObjectToUpdate) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ValidationError("Invalid staff id.");
    }
    return await Staff.findByIdAndUpdate(id, newStaffObjectToUpdate, {
        new: true,
    });
};

const remove = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ValidationError("Invalid staff id.");
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
