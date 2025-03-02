import mongoose from "mongoose";
import Staff from "../db/staff.model.js";

const create = async (req) => {
    const staffFromReqBody = req.body;
    if (req.file) {
        staffFromReqBody.image = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        };
    }
    return await new Staff(staffFromReqBody).save();
};

const getAll = async () => {
    return await Staff.find({});
};

const getAllWithPagination = async (page, pageSize) => {
    try {
        const staffs = await Staff.aggregate([
            {
                $facet: {
                    metadata: [{ $count: "totalCount" }],
                    data: [
                        { $skip: (page - 1) * pageSize },
                        { $limit: pageSize },
                    ],
                },
            },
        ]);
        return {
            metadata: {
                totalCount: staffs[0].metadata[0].totalCount,
                page,
                pageSize,
            },
            data: staffs[0].data,
        };
    } catch (error) {
        throw new Error("Pagination Error");
    }
};

const update = async (req) => {
    const { id } = req.params;
    const staff = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid staff id.");
    }

    try {
        return await Staff.findByIdAndUpdate(id, staff, {
            new: true,
        });
    } catch (error) {
        throw new Error("Server Error");
    }
};

const remove = async (req) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid staff id.");
    }

    await Staff.findByIdAndDelete(id);
};

const getStaffWithId = async (id) => {
    try {
        return await Staff.findById(id);
    } catch (error) {
        throw new Error(`Staff has id: ${id} not found.`);
    }
};

const getDepartmentList = () => {
    try {
        return Staff.distinct("department")
    } catch (error) {
        throw new Error("Distinct departments not found")
    }
}

export default {
    create,
    update,
    remove,
    getAll,
    getAllWithPagination,
    getStaffWithId,
    getDepartmentList
};
