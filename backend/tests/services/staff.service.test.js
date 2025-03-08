import { beforeEach, describe, expect, it, vi } from "vitest";
import staffService from "../../services/staff.service.js";
import Staff from "../../db/staff.model.js";
import NotFoundError from "../../utils/NotFoundError.js";
import ValidationError from "../../utils/ValidationError.js";
import utils from "../../utils/index.js";

vi.mock("../../db/staff.model.js");

const mockStaffToSave = {
    firstName: "first1",
    lastName: "last1",
    phone: "1234567801",
    email: "email1@localhost.com",
    department: "Department1",
};

const mockStaffArray = [
    {
        _id: "67cb20351fc66921c7584a23",
        firstName: "first2",
        lastName: "last2",
        phone: "1234567802",
        email: "email2@localhost.com",
        department: "Department2",
    },
    {
        _id: "67cb20351fc66921c7584a24",
        firstName: "first3",
        lastName: "last3",
        phone: "1234567803",
        email: "email3@localhost.com",
        department: "Department3",
    },
];

const mockValidId = "67cb20351fc66921c7584a23";
const mockInvalidId = "invalid id";

describe("Staff Service", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("Create staff", () => {
        const mockValidateSync = vi.spyOn(Staff.prototype, "validateSync");
        const mockGetInvalidFields = vi.spyOn(utils, "getInvalidFields");

        it("should thrown ValidationError if staffObject is not valid.", async () => {
            const validationResult = {
                errors: [
                    { phone: "Must be 10 character" },
                    { email: "Invalid e-mail address" },
                ],
            };
            const invalidFields = {
                phone: "Must be 10 character",
                email: "Invalid e-mail address",
            };

            mockValidateSync.mockImplementationOnce(() => validationResult);
            mockGetInvalidFields.mockReturnValueOnce(invalidFields);

            await expect(
                staffService.create(mockStaffToSave)
            ).rejects.toThrowError(
                new ValidationError("Staff validation failed", invalidFields)
            );
            expect(mockValidateSync).toHaveBeenCalled();
            expect(mockValidateSync).toHaveReturnedWith(validationResult);
            expect(mockGetInvalidFields).toHaveBeenCalled();
            expect(mockGetInvalidFields).toHaveBeenCalledWith(validationResult);
        });

        it("should return saved staff if staffObject is valid", async () => {
            mockValidateSync.mockImplementationOnce(() => undefined);
            const mockStaffSaved = (mockStaffToSave._id =
                "67cb20351fc66921c7584a26");
            const mockStaffSave = vi
                .spyOn(Staff.prototype, "save")
                .mockReturnValueOnce(mockStaffSaved);

            const mockStaffReturned = await staffService.create(
                mockStaffToSave
            );
            expect(mockValidateSync).toHaveBeenCalled();
            expect(mockValidateSync).toHaveReturnedWith(undefined);
            expect(mockGetInvalidFields).not.toHaveBeenCalled();
            expect(mockStaffSave).toHaveBeenCalled();
            expect(mockStaffReturned._id).toBe(mockStaffSaved._id);
        });
    });

    describe("getAll", () => {
        it("should return staff array", async () => {
            const spyFind = vi
                .spyOn(Staff, "find")
                .mockResolvedValueOnce(mockStaffArray);
            await staffService.getAll();
            expect(spyFind).toHaveBeenCalledWith({});
            expect(spyFind).toHaveReturned(mockStaffArray);
        });
    });

    describe("update", () => {
        const mockNewStaffObjectToUpdate = mockStaffToSave;
        mockNewStaffObjectToUpdate.email = "updatedEmail@localhost.com";
        it("should thrown error when id from request is invalid", async () => {
            await expect(
                staffService.update(mockInvalidId, mockNewStaffObjectToUpdate)
            ).rejects.toThrowError(new ValidationError("Invalid staff id."));
        });

        it("should return updated staff when findByIdAdnUpdate method successfully", async () => {
            const mockfindByIdAndUpdate = vi
                .spyOn(Staff, "findByIdAndUpdate")
                .mockReturnValueOnce(mockNewStaffObjectToUpdate);
            await staffService.update(mockValidId, mockNewStaffObjectToUpdate);
            expect(mockfindByIdAndUpdate).toHaveBeenCalled();
            expect(mockfindByIdAndUpdate).toHaveBeenCalledWith(
                "67cb20351fc66921c7584a23",
                mockNewStaffObjectToUpdate,
                { new: true }
            );
            expect(mockfindByIdAndUpdate).toHaveReturned(
                mockNewStaffObjectToUpdate
            );
        });
    });

    describe("remove", () => {
        it("should thrown error when id from request is invalid", async () => {
            await expect(
                staffService.remove(mockInvalidId)
            ).rejects.toThrowError(new ValidationError("Invalid staff id."));
        });

        it("should remove staff by id", async () => {
            const mockfindByIdAndRemove = vi.spyOn(Staff, "findByIdAndDelete");
            await staffService.remove(mockValidId);
            expect(mockfindByIdAndRemove).toHaveBeenCalled();
            expect(mockfindByIdAndRemove).toHaveBeenCalledWith(mockValidId);
        });
    });

    describe("getAllWithPagination", () => {
        const page = 1;
        const pageSize = 5;

        const mockStaffArrayWithPagination = [
            {
                metadata: {
                    totalCount: 10,
                    page: page,
                    pageSize: pageSize,
                },
                data: [],
            },
        ];

        it("should thrown NotFoundError when aggreating Staff data array is empty", async () => {
            vi.spyOn(Staff, "aggregate").mockResolvedValue(
                mockStaffArrayWithPagination
            );
            await expect(
                staffService.getAllWithPagination(page, pageSize)
            ).rejects.toThrowError(new NotFoundError("Staff list not found."));
        });

        it("should list all staffs based on page data", async () => {
            mockStaffArrayWithPagination.data = [
                { _id: 1, firstName: "fN1" },
                { _id: 2, firstName: "fN2" },
                { _id: 3, firstName: "fN3" },
                { _id: 4, firstName: "fN4" },
                { _id: 5, firstName: "fN5" },
            ];

            const getAllWithPagination = vi
                .spyOn(staffService, "getAllWithPagination")
                .mockResolvedValueOnce(mockStaffArrayWithPagination);
            await staffService.getAllWithPagination(page, pageSize);
            expect(getAllWithPagination).toHaveBeenCalled();
            expect(getAllWithPagination).toHaveReturned(
                mockStaffArrayWithPagination
            );
        });
    });

    describe("getStaffWithId", () => {
        it("should thrown Validation Error if id is invalid.", async () => {
            await expect(
                staffService.getStaffWithId(mockInvalidId)
            ).rejects.toThrow(new ValidationError("Invalid staff id."));
        });

        it("should thrown NotFoundError when findById return null", async () => {
            vi.spyOn(Staff, "findById").mockReturnValueOnce(null);
            await expect(
                staffService.getStaffWithId(mockValidId)
            ).rejects.toThrowError(
                new NotFoundError(`Staff has id: ${mockValidId} not found.`)
            );
        });

        it("should find staff findById method runs successfully", async () => {
            const id = "67cb20351fc66921c7584a23";
            const mockStaff = mockStaffArray[0];
            const mockStaffFindById = vi
                .spyOn(Staff, "findById")
                .mockResolvedValueOnce(mockStaff);
            const staffFound = await staffService.getStaffWithId(id);
            expect(mockStaffFindById).toHaveBeenCalledWith(id);
            expect(staffFound._id).toBe("67cb20351fc66921c7584a23");
        });
    });

    describe("getDepartmentList", () => {
        const mockStaffDistinctMethod = vi.spyOn(Staff, "distinct");

        it("should throw error when distinct method failed", async () => {
            mockStaffDistinctMethod.mockRejectedValueOnce("Distinct error.");
            await expect(staffService.getDepartmentList()).rejects.toThrowError(
                "Distinct error."
            );
            expect(mockStaffDistinctMethod).toHaveBeenCalled();
            expect(mockStaffDistinctMethod).toHaveBeenCalledWith("department");
        });

        it("should return list of departments if distinct method run successfully", async () => {
            const mockDepartmentList = ["department1", "department2"];
            mockStaffDistinctMethod.mockResolvedValueOnce(mockDepartmentList);
            const departmentList = await staffService.getDepartmentList();
            expect(mockStaffDistinctMethod).toHaveBeenCalled();
            expect(mockStaffDistinctMethod).toHaveBeenCalledWith("department");
            expect(departmentList).toBe(mockDepartmentList);
        });
    });
});
