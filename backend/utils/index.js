import multer from "multer";
import path from "path";
import BaseError from "./Errors/BaseError.js";

const createSuccessResult = (statusCode, message) => ({
    status: "success",
    statusCode: statusCode,
    message: message,
});

const createSuccessDataResult = (statusCode, data, metadata, message) => ({
    status: "success",
    statusCode: statusCode,
    message: message,
    metadata: !metadata ? undefined : metadata,
    data: data,
});

const createErrorResult = (statusCode, error) => ({
    status: "error",
    statusCode: statusCode,
    message: "Error occured in API Server.",
    error: {
        message: error.message,
        invalidFields: error.invalidFields,
    },
});

const createErrorDataResult = (statusCode, message, error, data) => ({
    status: "error",
    statusCode: statusCode,
    message: message,
    data: data,
    error: {
        message: error.message,
        invalidFields: error.invalidFields,
    },
});

const getInvalidFields = (error) => {
    let errors = {};

    Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
    });
    return errors;
};

const getMulterForCreateStaff = () => {
    const fileTypes = /jpeg|jpg|png/;
    const storage = multer.memoryStorage();
    return multer(
        multer({
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
        })
    );
};

export default {
    createSuccessResult,
    createErrorResult,
    createSuccessDataResult,
    createErrorDataResult,
    getInvalidFields,
    getMulterForCreateStaff
};
