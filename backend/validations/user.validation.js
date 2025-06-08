import { body } from "express-validator";

export const userValidatorToCreate = [
    body("userName")
        .notEmpty()
        .withMessage("User name is required")
        .isString()
        .isLength({ max: 10 })
        .withMessage("User name must be 10 characters."),
    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isString()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    body("passwordToConfirm")
        .notEmpty()
        .withMessage("Password to confirm is required.")
        .isString()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                return Promise.reject("Password to confirm doesn't match.");
            } else {
                return true;
            }
        }),
];
