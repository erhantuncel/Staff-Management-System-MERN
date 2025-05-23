import { body, param, query } from "express-validator";

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

export const pageValidatorForgetStaffsByDepartmentAndQueryParamsPaginated = [
    query("page")
        .isNumeric({ no_symbols: false })
        .withMessage("page should be numeric"),
    query("pageSize")
        .isNumeric({ no_symbols: true })
        .withMessage("pageSize should be numeric"),
    query("firstName")
        .optional()
        .isString()
        .withMessage("firstName should be string"),
    query("lastName")
        .optional()
        .isString()
        .withMessage("lastName should be string"),
    query("department")
        .optional()
        .isString()
        .withMessage("department should be string."),
];

export const staffValidatorToUpdate = [
    param("id").isMongoId().withMessage("id must be valid mongoId."),
    body("firstName")
        .optional({ values: "falsy" })
        .isString()
        .withMessage("First name must be string")
        .isLength({ max: 40 })
        .withMessage("First name must be maximum 40 characters."),
    body("lastName")
        .optional({ values: "falsy" })
        .isString()
        .withMessage("Last name must be string")
        .isLength({ max: 40 })
        .withMessage("Last name must be maximum 40 characters."),
    body("phone")
        .optional({ values: "falsy" })
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
        .optional({ values: "falsy" })
        .isString()
        .withMessage("E-mail should be string")
        .isEmail()
        .withMessage("E-mail must be valid format."),
    body("department")
        .optional({ values: "falsy" })
        .isString()
        .withMessage("Department should be string"),
];

export const idValidator = [
    param("id").isMongoId().withMessage("id must be valid mongoId."),
];
