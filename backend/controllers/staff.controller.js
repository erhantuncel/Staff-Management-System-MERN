import staffService from "../services/staff.service.js";
import utils from "../utils/index.js";

const getAllStaff = async (req, res, next) => {
    try {
        const staffs = await staffService.getAll();
        res.status(200).json(utils.createSuccessDataResult(200, staffs));
    } catch (error) {
        next(error);
    }
};

const createStaff = async (req, res, next) => {
    try {
        let staffObjectToSave = req.body;
        if (req.file) {
            staffObjectToSave.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            };
        }
        const newStaff = await staffService.create(staffObjectToSave);
        res.status(201).json(utils.createSuccessDataResult(201, newStaff));
    } catch (error) {
        next(error);
    }
};

const updateStaff = async (req, res, next) => {
    try {
        const { id } = req.params;
        let newStaffObjectToUpdate = req.body;
        if (req.file) {
            newStaffObjectToUpdate.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            };
        }
        const updatedStaff = await staffService.update(
            id,
            newStaffObjectToUpdate
        );
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

const getStaffsByDepartmentAndQueryParamsPaginated = async (req, res, next) => {
    let { firstName, lastName, department, page, pageSize } = req.query;
    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 5;
    let filter = { keyword: null, fieldName: null };
    if (firstName || lastName) {
        if (firstName) {
            filter = { ...filter, keyword: firstName, fieldName: "firstName" };
        } else {
            filter = { ...filter, keyword: lastName, fieldName: "lastName" };
        }
    }
    try {
        let staffsWithPagination = null;
        if (!department && !filter.keyword) {
            staffsWithPagination = await staffService.getAllWithPagination(
                page,
                pageSize
            );
        } else {
            staffsWithPagination =
                await staffService.getStaffByDepartmentAndFirstOrLastNamePaginated(
                    filter.keyword,
                    filter.fieldName,
                    department,
                    page,
                    pageSize
                );
        }
        res.status(200).json(
            utils.createSuccessDataResult(
                200,
                staffsWithPagination.data,
                staffsWithPagination.metadata,
                "Paginated staffs by first name and department are listed successfully."
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
    getStaffWithId,
    getDepartmentList,
    getStaffsByDepartmentAndQueryParamsPaginated,
};
