import mongoose from "mongoose";
import Staff from "../db/staff.model.js";
import utils from "../utils/index.js";
import ValidationError from "../utils/Errors/ValidationError.js";
import NotFoundError from "../utils/Errors/NotFoundError.js";

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

// const getAll = async () => {
//     return await Staff.find({});
// };

const getAll = async (
    department,
    fieldName,
    keyword,
    page,
    pageSize,
    sortField,
    order
) => {
    let matchCriterias = {};
    if (department) {
        matchCriterias = { department: department };
    }
    if (fieldName) {
        matchCriterias[fieldName] = { $regex: keyword };
    }

    const pipeLine = [
        {
            $match: matchCriterias,
        },
        {
            $facet: {
                metadata: [{ $count: "totalCount" }],
                data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
            },
        },
        {
            $project: {
                metadata: {
                    totalCount: {
                        $ifNull: [{ $first: "$metadata.totalCount" }, 0],
                    },
                },
                data: "$data",
            },
        },
    ];

    if (sortField !== null) {
        let sortCriteria = {};
        sortCriteria[sortField] = order;
        pipeLine[1].$facet.data.push({ $sort: sortCriteria });
    }

    pipeLine.map((obj) => console.log(obj));

    const aggregationCursor = await Staff.aggregate(pipeLine);

    let result = null;
    aggregationCursor.forEach((staff) => {
        if (staff.data.length === 0) {
            throw new NotFoundError("Staff list not found.");
        }
        result = {
            ...staff,
            metadata: { ...staff.metadata[0], page: page, pageSize: pageSize },
        };
    });
    return result;
};

const getAllWithPagination = async (page, pageSize) => {
    const staffs = await Staff.aggregate([
        {
            $facet: {
                metadata: [{ $count: "totalCount" }],
                data: [
                    { $sort: { firstName: -1 } },
                    { $skip: (page - 1) * pageSize },
                    { $limit: pageSize },
                ],
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

const getStaffByDepartmentAndFirstOrLastNamePaginated = async (
    keyword,
    firstOrLast,
    department,
    page,
    pageSize
) => {
    if (!department || !keyword) {
        throw new NotFoundError("Staff list not found");
    }
    let matchCriterias = { department: department };
    matchCriterias[firstOrLast] = { $regex: keyword };
    console.log("aggregating before sort");
    const pipeLine = [
        {
            $match: matchCriterias,
        },
        {
            $facet: {
                metadata: [{ $count: "totalCount" }],
                data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
            },
        },
        {
            $project: {
                metadata: {
                    totalCount: {
                        $ifNull: [{ $first: "$metadata.totalCount" }, 0],
                    },
                },
                data: "$data",
            },
        },
    ];

    const aggregationCursor = await Staff.aggregate(pipeLine);

    let result = null;
    aggregationCursor.forEach((staff) => {
        if (staff.data.length === 0) {
            throw new NotFoundError("Staff list not found.");
        }
        result = {
            ...staff,
            metadata: { ...staff.metadata[0], page: page, pageSize: pageSize },
        };
    });
    return result;
};

export default {
    create,
    update,
    remove,
    getAll,
    getAllWithPagination,
    getStaffWithId,
    getDepartmentList,
    getStaffByDepartmentAndFirstOrLastNamePaginated,
};
