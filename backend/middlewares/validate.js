import { validationResult } from "express-validator";
import utils from "../utils/index.js";
import ValidationError from "../utils/Errors/ValidationError.js";

export const validate = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let invalidFieldsObject = {};
        validationErrors.array().forEach((error) => {
            invalidFieldsObject[error.path] = error.msg;
        });
        const error = new ValidationError(
            "Invalid request!",
            invalidFieldsObject
        );
        res.status(error.statusCode).json(
            utils.createErrorResult(error.statusCode, error)
        );
    } else {
        next();
    }
};
