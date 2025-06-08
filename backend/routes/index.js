import express from "express";
import { staffController, userController } from "../controllers/index.js";
import { validate } from "../middlewares/validate.js";
import utils from "../utils/index.js";

import {
    staffValidatorToCreate,
    pageValidatorForgetStaffsByDepartmentAndQueryParamsPaginated,
    staffValidatorToUpdate,
    idValidator,
} from "../validations/staff.validation.js";
import { userValidatorToCreate } from "../validations/user.validation.js";
const router = express.Router();

/**
 *  @swagger
 *  /staffs:
 *      get:
 *          summary: Get all staffs.
 *          description: Get all staffs.
 *          responses:
 *              "200":
 *                  description: "A successful response"
 *              "404":
 *                  description: "Staff not found."
 *              "500":
 *                  description: "Internal server error."
 */
router.get("/staffs", staffController.getAllStaff);

/**
 *  @swagger
 *  /staffs/pagination:
 *      get:
 *          summary: Get all staffs with paginatation.
 *          description: Get all staffs with paginatation.
 *          parameters:
 *              - in: query
 *                name: page
 *                schema:
 *                  type: integer
 *                description: The number of page.
 *              - in: query
 *                name: pageSize
 *                schema:
 *                  type: integer
 *                description: Number of items of one page.
 *          responses:
 *              "200":
 *                  description: "A successful response"
 *              "404":
 *                  description: "Staff not found."
 *              "500":
 *                  description: "Internal server error."
 */
router.get(
    "/staffs/pagination",
    pageValidatorForgetStaffsByDepartmentAndQueryParamsPaginated,
    validate,
    staffController.getStaffsByDepartmentAndQueryParamsPaginated
);

/**
 *  @swagger
 *  /staffs/{id}:
 *      get:
 *          summary: Get staff with id.
 *          description: Get staff with id.
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                description: id of staff.
 *          responses:
 *              "200":
 *                  description: "A successful response"
 *              "404":
 *                  description: "Staff not found."
 *              "500":
 *                  description: "Internal server error."
 */
router.get(
    "/staffs/:id",
    idValidator,
    validate,
    staffController.getStaffWithId
);

/**
 *  @swagger
 *  /staffs:
 *      post:
 *          summary: Create new staff.
 *          description: Create new staff.
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              firstName:
 *                                  type: string
 *                              lastName:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              phone:
 *                                  type: string
 *                              department:
 *                                  type: string
 *                              image:
 *                                  type: string
 *                                  format: binary
 *                          required:
 *                              - firstName
 *                              - lastName
 *                              - email
 *                              - phone
 *                              - department
 *          responses:
 *              "201":
 *                  description: "A successful response"
 *              "500":
 *                  description: "Internal server error."
 */
router.post(
    "/staffs",
    utils.getMulterForCreateStaff().single("image"),
    staffValidatorToCreate,
    staffController.createStaff
);

/**
 *  @swagger
 *  /staffs/{id}:
 *      put:
 *          summary: Update staff.
 *          description: Update new staff.
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                description: id of staff.
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              firstName:
 *                                  type: string
 *                              lastName:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              phone:
 *                                  type: string
 *                              department:
 *                                  type: string
 *                              image:
 *                                  type: string
 *                                  format: binary
 *          responses:
 *              "201":
 *                  description: "A successful response"
 *              "404":
 *                  description: "Staff not found."
 *              "500":
 *                  description: "Internal server error."
 */
router.put(
    "/staffs/:id",
    utils.getMulterForCreateStaff().single("image"),
    staffValidatorToUpdate,
    validate,
    staffController.updateStaff
);

/**
 *  @swagger
 *  /staffs/{id}:
 *      delete:
 *          summary: Remove staff with id.
 *          description: Remove staff with id.
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                description: id of staff.
 *          responses:
 *              "200":
 *                  description: "A successful response"
 *              "404":
 *                  description: "Staff not found."
 *              "500":
 *                  description: "Internal server error."
 */
router.delete(
    "/staffs/:id",
    idValidator,
    validate,
    staffController.removeStaff
);

/**
 *  @swagger
 *  /departments:
 *      get:
 *          summary: Get department list.
 *          description: Get department list.
 *          responses:
 *              "200":
 *                  description: "A successful response"
 *              "404":
 *                  description: "Department not found."
 *              "500":
 *                  description: "Internal server error."
 */
router.get("/departments", staffController.getDepartmentList);

router.get("/staffs/");

/**
 *  @swagger
 *  /users:
 *      post:
 *          summary: Create new user.
 *          description: Create new user.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              userName:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                              passwordToConfirm:
 *                                  type: string
 *                          required:
 *                              - userName
 *                              - password
 *                              - passwordToConfirm
 *          responses:
 *              "201":
 *                  description: "A successful response"
 *              "500":
 *                  description: "Internal server error."
 */
router.post(
    "/users",
    userValidatorToCreate,
    validate,
    userController.createUser
);

export default router;
