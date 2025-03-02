import staffService from "../services/staff.service.js";
import utils from "../utils/index.js";
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

const { getAll, create, getAllWithPagination } = staffService;

const getAllStaff = async (req, res, next) => {
    try {
        const staffs = await getAll();
        res.status(200).json({ success: true, data: staffs });
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllStaffWithPagination = async (req, res, next) => {
    let { page, pageSize } = req.query;
    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 10;
    try {
        const staffsWithPagination = await staffService.getAllWithPagination(
            page,
            pageSize
        );
        res.status(200).json({ success: true, data: staffsWithPagination });
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createStaff = async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            res.status(501).json({ success: false, message: err.message });
            return;
        }
        try {
            const newStaff = await create(req);
            res.status(201).json({ success: true, data: newStaff });
            next();
        } catch (error) {
            res.status(501).json({
                success: false,
                message: utils.createErrorMessage(error),
            });
        }
    });
};

const updateStaff = async (req, res, next) => {
    try {
        const updatedStaff = await staffService.update(req);
        res.status(200).json({ success: true, data: updatedStaff });
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const removeStaff = async (req, res, next) => {
    try {
        await staffService.remove(req);
        res.status(200).json({ success: true, message: "Staff is removed." });
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getStaffWithId = async(req, res, next) => {
    const {id} = req.params
    try {
        const staffFound = await staffService.getStaffWithId(id)
        res.status(200).json({success: true, data: staffFound})
        next()
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export default {
    getAllStaff,
    createStaff,
    updateStaff,
    removeStaff,
    getAllStaffWithPagination,
    getStaffWithId
};
