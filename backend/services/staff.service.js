import mongoose from "mongoose";
import Staff from "../db/staff.model.js";
import multer from "multer";
import path from "path";

const fileTypes = /jpeg|jpg|png/;
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const extName = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        const mimeType = fileTypes.test(file.mimetype);
        if (mimeType && extName) {
            cb(null, true);
        } else {
            cb(new Error("Images only! (jpeg, jpg, png)"), false);
        }
    },
}).single("image");

const create = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

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
        newStaff.image = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        };

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
            res.status(501).json({ success: false, message: "Server Error" });
        }
    });
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
