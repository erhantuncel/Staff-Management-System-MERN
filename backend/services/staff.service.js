import mongoose from "mongoose";
import Staff from "../db/staff.model.js";

const create = async (req, res, next) => {
    const staffFromReqBody = req.body;
    const newStaff = new Staff(staffFromReqBody);
    if (req.file) {
        newStaff.image = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        };
    }
    return await newStaff.save();
};

const getAll = async () => {
    return await Staff.find({});
};

const update = async (req, res) => {
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
        console.log(error);
        throw new Error("Sever Error");
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid staff id.");
    }

    await Staff.findByIdAndDelete(id);
};

export default { create, update, remove, getAll };
