import { beforeEach, describe, expect, it, test, vi } from "vitest";
import staffService from "../../services/staff.service.js";
import Staff from "../../db/staff.model.js";
import NotFoundError from "../../utils/NotFoundError.js";
import ValidationError from "../../utils/ValidationError.js";

vi.mock("../../db/staff.model.js");

const mockStaffToSave = {
    firstName: "first1",
    lastName: "last1",
    phone: "1234567801",
    email: "email1@localhost.com",
    department: "Department1",
};

const mockFile = {
    buffer: Buffer.from("7123jasxs89812", "hex"),
    mimetype: "image/png",
};

const mockStaffToSaveWithImage = {
    ...mockStaffToSave,
    image: {
        data: mockFile.buffer,
        contentType: mockFile.mimetype,
    },
};

const mockRequestWithoutFile = {
    body: mockStaffToSave,
};
const mockRequestWithFile = {
    ...mockRequestWithoutFile,
    file: mockFile,
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

const mockSavedStaff = { id: 1, ...mockStaffToSave };
const mockSavedStaffWithImage = { id: 1, ...mockStaffToSaveWithImage };

describe("Staff Service", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("Create staff", () => {
        it("should return saved staff object has not image file", async () => {
            const saveMethod = vi
                .spyOn(Staff.prototype, "save")
                .mockResolvedValueOnce(mockSavedStaff);
            await staffService.create(mockRequestWithoutFile);
            expect(Staff).toHaveBeenCalledWith(mockStaffToSave);
            expect(saveMethod).toHaveBeenCalled();
            expect(saveMethod).toReturnWith(Promise.resolve(mockSavedStaff));
        });

        it("should return saved staff object has image file", async () => {
            const saveMethod = vi
                .spyOn(Staff.prototype, "save")
                .mockResolvedValueOnce(mockSavedStaff);
            await staffService.create(mockRequestWithFile);
            expect(Staff).toHaveBeenCalledWith(mockStaffToSaveWithImage);
            expect(saveMethod).toHaveBeenCalled();
            expect(saveMethod).toReturnWith(
                Promise.resolve(mockSavedStaffWithImage)
            );
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
        it("should thrown error when id from request is invalid", async () => {
            const mockRequest = {
                params: { id: "invalidId" },
                ...mockRequestWithoutFile,
            };

            await expect(staffService.update(mockRequest)).rejects.toThrowError(
                "Invalid staff id."
            );
        });

        it("should return error when findByIdAdnUpdate method failed", async () => {
            const mockRequest = {
                params: { id: 1 },
                ...mockRequestWithoutFile,
            };

            const mockUpdatedStaff = mockRequest.body;
            mockUpdatedStaff.email = "updatedEmail@localhost.com";
            vi.spyOn(Staff, "findByIdAndUpdate").mockRejectedValueOnce();
            await expect(staffService.update(mockRequest)).rejects.toThrowError(
                "Server Error"
            );
            expect(Staff.findByIdAndUpdate).toHaveBeenCalledWith(
                1,
                mockUpdatedStaff,
                { new: true }
            );
        });

        it("should return updated staff when findByIdAdnUpdate method successfully", async () => {
            const mockRequest = {
                params: { id: 1 },
                ...mockRequestWithoutFile,
            };
            const mockUpdatedStaff = mockRequest.body;
            mockUpdatedStaff.email = "updatedEmail@localhost.com";
            const mockfindByIdAndUpdate = vi
                .spyOn(Staff, "findByIdAndUpdate")
                .mockReturnValueOnce(mockUpdatedStaff);
            await staffService.update(mockRequest);
            expect(mockfindByIdAndUpdate).toHaveBeenCalled();
            expect(mockfindByIdAndUpdate).toHaveBeenCalledWith(
                1,
                mockUpdatedStaff,
                { new: true }
            );
            expect(mockfindByIdAndUpdate).toHaveReturned(mockUpdatedStaff);
        });
    });

    describe("remove", () => {
        it("should thrown error when id from request is invalid", async () => {
            const mockRequest = {
                params: { id: "invalidId" },
                ...mockRequestWithoutFile,
            };

            await expect(staffService.remove(mockRequest)).rejects.toThrowError(
                "Invalid staff id."
            );
        });

        it("should remove staff by id", async () => {
            const mockRequest = {
                params: { id: 1 },
                ...mockRequestWithoutFile,
            };

            const mockfindByIdAndRemove = vi.spyOn(Staff, "findByIdAndDelete");
            await staffService.remove(mockRequest);
            expect(mockfindByIdAndRemove).toHaveBeenCalled();
        });
    });

    describe("getAllWithPagination", () => {
        const mockRequest = {
            query: { page: 1, pageSize: 5 },
        };

        const mockStaffArrayWithPagination = [
            {
                metadata: {
                    totalCount: 10,
                    page: 1,
                    pageSize: 5,
                },
                data: [],
            },
        ];

        it("should thrown NotFoundError when aggreating Staff data array is empty", async () => {
            vi.spyOn(Staff, "aggregate").mockResolvedValue(
                mockStaffArrayWithPagination
            );
            await expect(
                staffService.getAllWithPagination(
                    mockRequest.query.page,
                    mockRequest.query.pageSize
                )
            ).rejects.toThrowError(new NotFoundError("Staff list not found."));
        });

        it("should list all staffs based on page data", async () => {
            const mockStaffArrayWithPagination = {
                metadata: {
                    totalCount: 10,
                    page: 1,
                    pageSize: 5,
                },
                data: [
                    { _id: 1, firstName: "fN1" },
                    { _id: 2, firstName: "fN2" },
                    { _id: 3, firstName: "fN3" },
                    { _id: 4, firstName: "fN4" },
                    { _id: 5, firstName: "fN5" },
                ],
            };
            const getAllWithPagination = vi
                .spyOn(staffService, "getAllWithPagination")
                .mockResolvedValueOnce(mockStaffArrayWithPagination);
            await staffService.getAllWithPagination(
                mockRequest.query.page,
                mockRequest.query.pageSize
            );
            expect(getAllWithPagination).toHaveBeenCalled();
            expect(getAllWithPagination).toHaveReturned(
                mockStaffArrayWithPagination
            );
        });
    });

    describe("getStaffWithId", () => {
        it("should thrown Validation Error if id is invalid.", async () => {
            await expect(staffService.getStaffWithId("1")).rejects.toThrow(
                new ValidationError("Invalid staff id.")
            );
        });

        it("should thrown NotFoundError when findById return null", async () => {
            vi.spyOn(Staff, "findById").mockResolvedValue(null);
            const id = "67cb20351fc66921c7584a23";
            await expect(staffService.getStaffWithId(id)).rejects.toThrowError(
                new NotFoundError(`Staff has id: ${id} not found.`)
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
        it("should throw error when distinct method failed", async () => {
            const mockDistinct = vi
                .spyOn(Staff, "distinct")
                .mockRejectedValueOnce("Distinct error.");
            await expect(staffService.getDepartmentList()).rejects.toThrowError(
                "Distinct error."
            );
            expect(mockDistinct).toHaveBeenCalled();
            expect(mockDistinct).toHaveBeenCalledWith("department");
        });

        it("should return list of departments if distinct method run successfully", async () => {
            const mockDepartmentList = ["department1", "department2"];
            const mockDistinct = vi
                .spyOn(Staff, "distinct")
                .mockResolvedValueOnce(mockDepartmentList);
            const departmentList = await staffService.getDepartmentList();
            expect(mockDistinct).toHaveBeenCalled();
            expect(mockDistinct).toHaveBeenCalledWith("department");
            expect(departmentList).toBe(mockDepartmentList);
        });
    });
});
