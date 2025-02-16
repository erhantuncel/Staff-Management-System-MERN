import mongoose from "mongoose";
import Staff from "../db/staff.model.js";

const create = async (req, res) => {
    const staffFromReqBody = req.body;

    if (
        !staffFromReqBody.firstName ||
        !staffFromReqBody.lastName ||
        !staffFromReqBody.phone ||
        !staffFromReqBody.email ||
        !staffFromReqBody.department
    ) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields.",
        });
    }

    const newStaff = new Staff(staffFromReqBody);

    try {
        await newStaff.save();
        res.status(201).json({ success: true, data: newStaff });
    } catch (error) {
        console.error("Error in create product:", error);
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).json({
                success: false,
                message: { validationErrors: errors },
            });
        }
        // res.status(500).send("Something went wrong");
        res.status(501).json({ success: false, message: "Server Error" });
    }
};

const getAll = async (req, res) => {
    try {
        const staffs = await Staff.find({});
        res.status(200).json({ success: true, data: staffs });
    } catch (error) {
        console.log("Error in fetchin staffs ", error);
        res.status(501).json({ success: false, message: "Sever error" });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const staff = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "Invalid staff id." });
    }

    try {
        const updatedStaff = await Staff.findByIdAndUpdate(id, staff, {
            new: true,
        });
        res.status(200).json({ success: true, data: updatedStaff });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "Invalid staff id." });
    }

    try {
        await Staff.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Staff is removed." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export default { create, update, remove, getAll };
