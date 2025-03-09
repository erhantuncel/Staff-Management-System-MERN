import staffService from "../services/staff.service.js";
import BaseError from "../utils/Errors/BaseError.js";
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
            cb(new BaseError("Images only! (jpeg, jpg, png)"), false);
        }
    },
}).single("image");

const getAllStaff = async (req, res, next) => {
    try {
        const staffs = await staffService.getAll();
        res.status(200).json(utils.createSuccessDataResult(200, staffs));
    } catch (error) {
        next(error);
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
        res.status(200).json(
            utils.createSuccessDataResult(
                200,
                staffsWithPagination.data,
                staffsWithPagination.metadata,
                "Paginated staffs are listed successfully."
            )
        );
    } catch (error) {
        next(error);
    }
};

const createStaff = async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            next(err);
        } else {
            try {
                let staffObjectToSave = req.body;
                if (req.file) {
                    staffObjectToSave.image = {
                        data: req.file.buffer,
                        contentType: req.file.mimetype,
                    };
                }
                const newStaff = await staffService.create(staffObjectToSave);
                res.status(201).json(
                    utils.createSuccessDataResult(201, newStaff)
                );
            } catch (error) {
                next(error);
            }
        }
    });
};

const updateStaff = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newStaffObjectToUpdate = req.body;
        const updatedStaff = await staffService.update(id, newStaffObjectToUpdate);
        res.status(200).json(utils.createSuccessDataResult(200, updatedStaff));
    } catch (error) {
        next(error);
    }
};

const removeStaff = async (req, res, next) => {
    try {
        const { id } = req.params;
        await staffService.remove(id);
        res.status(200).json(
            utils.createSuccessResult(
                200,
                `Staff has id:${req.params.id} is removed.`
            )
        );
    } catch (error) {
        next(error);
    }
};

const getStaffWithId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const staffFound = await staffService.getStaffWithId(id);
        res.status(200).json(
            utils.createSuccessDataResult(
                200,
                staffFound,
                null,
                `Staff with id:${id} is found.`
            )
        );
    } catch (error) {
        next(error);
    }
};

const getDepartmentList = async (req, res, next) => {
    try {
        const departmentList = await staffService.getDepartmentList();
        res.status(200).json(
            utils.createSuccessDataResult(
                200,
                departmentList,
                null,
                "Departments are listed successfully."
            )
        );
    } catch (error) {
        next(error);
    }
};

export default {
    getAllStaff,
    createStaff,
    updateStaff,
    removeStaff,
    getAllStaffWithPagination,
    getStaffWithId,
    getDepartmentList,
};
