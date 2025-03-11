import { body } from "express-validator";

export const staffValidatorToCreate = [
    body("firstName")
        .notEmpty()
        .withMessage("First name is required")
        .isString()
        .withMessage("First name must be string")
        .isLength({ max: 40 })
        .withMessage("First name must be maximum 40 characters."),
    body("lastName")
        .notEmpty()
        .withMessage("Last name is required")
        .isString()
        .withMessage("Last name must be string")
        .isLength({ max: 40 })
        .withMessage("Last name must be maximum 40 characters."),
    body("phone")
        .notEmpty()
        .withMessage("Phone is required")
        .isString()
        .withMessage("Phone should be string")
        .custom((value) => {
            if (value.length !== 10) {
                return Promise.reject("Phone number should be 10 digits");
            } else {
                return true;
            }
        }),
    body("email")
        .notEmpty()
        .withMessage("E-mail is required")
        .isString()
        .withMessage("E-mail should be string")
        .isEmail()
        .withMessage("E-mail must be valid format."),
    body("department")
        .notEmpty()
        .withMessage("Department is required")
        .isString()
        .withMessage("Department should be string"),
];
