import express from "express";
import {
    staffController,
    authenticationController,
} from "../controllers/index.js";
import { validate } from "../middlewares/validate.js";
import utils from "../utils/index.js";

import {
    staffValidatorToCreate,
    pageValidatorForgetStaffsByDepartmentAndQueryParamsPaginated,
    staffValidatorToUpdate,
    idValidator,
} from "../validations/staff.validation.js";
import { userValidatorToCreate } from "../validations/user.validation.js";
import { verifyToken } from "../middlewares/jwtAuthentication.js";
const router = express.Router();

/**
 *  @swagger
 *  /staffs:
 *      get:
 *          security:
 *              - bearer-key: []
 *          summary: Get all staffs.
 *          description: Get all staffs.
 *          tags:
 *              - Staffs
 *          parameters:
 *              - in: query
 *                name: department
 *                schema:
 *                  type: string
 *                description: Department name.
 *              - in: query
 *                name: firstName
 *                schema:
 *                  type: string
 *                description: Staff first name.
 *              - in: query
 *                name: lastName
 *                schema:
 *                  type: string
 *                description: Staff last name.
 *              - in: query
 *                name: sortField
 *                schema:
 *                  type: string
 *                description: Field name to sort.
 *              - in: query
 *                name: order
 *                schema:
 *                  type: string
 *                description: Sort order. asc or desc
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
router.get("/staffs", verifyToken, staffController.getAllStaff);

/**
 *  @swagger
 *  /staffs/pagination:
 *      get:
 *          security:
 *              - bearer-key: []
 *          summary: Get all staffs with paginatation.
 *          description: Get all staffs with paginatation.
 *          tags:
 *              - Staffs
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
    verifyToken,
    pageValidatorForgetStaffsByDepartmentAndQueryParamsPaginated,
    validate,
    staffController.getStaffsByDepartmentAndQueryParamsPaginated
);

/**
 *  @swagger
 *  /staffs/{id}:
 *      get:
 *          security:
 *              - bearer-key: []
 *          summary: Get staff with id.
 *          description: Get staff with id.
 *          tags:
 *              - Staffs
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
    verifyToken,
    idValidator,
    validate,
    staffController.getStaffWithId
);

/**
 *  @swagger
 *  /staffs:
 *      post:
 *          security:
 *              - bearer-key: []
 *          summary: Create new staff.
 *          description: Create new staff.
 *          tags:
 *              - Staffs
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
    verifyToken,
    utils.getMulterForCreateStaff().single("image"),
    staffValidatorToCreate,
    staffController.createStaff
);

/**
 *  @swagger
 *  /staffs/{id}:
 *      put:
 *          security:
 *              - bearer-key: []
 *          summary: Update staff.
 *          description: Update new staff.
 *          tags:
 *              - Staffs
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
    verifyToken,
    utils.getMulterForCreateStaff().single("image"),
    staffValidatorToUpdate,
    validate,
    staffController.updateStaff
);

/**
 *  @swagger
 *  /staffs/{id}:
 *      delete:
 *          security:
 *              - bearer-key: []
 *          summary: Remove staff with id.
 *          description: Remove staff with id.
 *          tags:
 *              - Staffs
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
    verifyToken,
    idValidator,
    validate,
    staffController.removeStaff
);

/**
 *  @swagger
 *  /departments:
 *      get:
 *          security:
 *              - bearer-key: []
 *          summary: Get department list.
 *          description: Get department list.
 *          tags:
 *              - Departments
 *          responses:
 *              "200":
 *                  description: "A successful response"
 *              "404":
 *                  description: "Department not found."
 *              "500":
 *                  description: "Internal server error."
 */
router.get("/departments", verifyToken, staffController.getDepartmentList);

router.get("/staffs/");

/**
 *  @swagger
 *  /users/register:
 *      post:
 *          summary: Create new user.
 *          description: Create new user.
 *          tags:
 *              - Users
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
    "/users/register",
    userValidatorToCreate,
    validate,
    authenticationController.register
);

/**
 *  @swagger
 *  /users/login:
 *      post:
 *          summary: Login user.
 *          description: Login user.
 *          tags:
 *              - Users
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
 *                          required:
 *                              - userName
 *                              - password
 *          responses:
 *              "200":
 *                  description: "A successful response"
 *              "401":
 *                  description: "Invalid password"
 *              "404":
 *                  description: "User not found"
 *              "500":
 *                  description: "Internal server error."
 */
router.post("/users/login", authenticationController.login);

export default router;
