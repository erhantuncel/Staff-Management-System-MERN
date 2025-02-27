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

export default { create, update, remove, getAll };
