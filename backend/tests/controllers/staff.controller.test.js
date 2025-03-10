import { describe, expect, it, vi } from "vitest";
import staffController from "../../controllers/staff.controller.js";
import staffService from "../../services/staff.service.js";
import utils from "../../utils/index.js";
import path from "path";

vi.mock("../../services/staff.service.js");

vi.mock("multer", () => {
    const memoryStorage = vi.fn();
    const mockMulter = () => ({
        memoryStorage: memoryStorage(),
        single: vi.fn((fieldName) => {
            return (req, res, next) => {
                const fileTypes = /jpeg|jpg|png/;
                const extName = fileTypes.test(
                    path.extname(req.file.originalname).toLowerCase()
                );
                const mimeType = fileTypes.test(req.file.mimetype);
                if (mimeType && extName) {
                    next(null, true);
                } else {
                    next(new Error("Images only! (jpeg, jpg, png)"), false);
                }
            };
        }),
    });
    mockMulter.memoryStorage = memoryStorage;
    return {
        default: mockMulter,
    };
});

const mockCreateSuccessDataResult = vi.spyOn(utils, "createSuccessDataResult");
const mockCreateSuccessResult = vi.spyOn(utils, "createSuccessResult");

const mockRequest = {};

const mockResponse = {
    json: vi.fn(),
    status: vi.fn(() => mockResponse),
};

const mockNext = vi.fn();

const mockRequestBody = {
    firstName: "first1",
    lastName: "last1",
    phone: "1234567801",
    email: "email1@localhost.com",
    department: "Department1",
};

const mockStaffArray = [
    {
        _id: "67cb20351fc66921c7584a23",
        firstName: "first1",
        lastName: "last1",
        phone: "1234567801",
        email: "email1@localhost.com",
        department: "Department1",
    },
    {
        _id: "67cb20351fc66921c7584a24",
        firstName: "first2",
        lastName: "last2",
        phone: "1234567802",
        email: "email2@localhost.com",
        department: "Department2",
    },
];

describe("Get all staff", () => {
    it("should return 500 when getAll method failed", async () => {
        const error = new Error("Server Error");
        vi.mocked(staffService.getAll).mockRejectedValueOnce(error);
        await staffController.getAllStaff(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(error);
    });

    it("should return 200 when getAll run successfully", async () => {
        vi.mocked(staffService.getAll).mockResolvedValueOnce(mockStaffArray);

        await staffController.getAllStaff(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockCreateSuccessDataResult).toHaveBeenCalledWith(
            200,
            mockStaffArray
        );
    });
});

describe("Create Staff", () => {
    mockRequest.body = mockRequestBody;

    it("should return 501 if file is invalid", async () => {
        (mockRequest.file = {
            buffer: Buffer.from("7123jasxs89812", "hex"),
            mimetype: "text/csv",
            originalname: "file.csv",
        }),
            await staffController.createStaff(
                mockRequest,
                mockResponse,
                mockNext
            );
        expect(mockNext).toHaveBeenCalled();
    });

    it("should return 501 if staffService.create method thrown an error", async () => {
        const error = new Error("Server Error");
        vi.spyOn(staffService, "create").mockRejectedValueOnce(error);
        await staffController.createStaff(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(error);
    });

    it("should return 201 if staff is created succesfully", async () => {
        mockRequest.file = {
            buffer: Buffer.from("7123jasxs89812", "hex"),
            mimetype: "image/png",
            originalname: "file.png",
        };

        const mockStaff = mockRequest.body;

        mockStaff.image = {
            data: mockRequest.file.buffer,
            contentType: mockRequest.mimeType,
        };

        vi.spyOn(staffService, "create").mockResolvedValueOnce(mockStaff);
        await staffController.createStaff(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalled();
        expect(mockCreateSuccessDataResult).toHaveBeenCalledWith(
            201,
            mockStaff
        );
    });
});

describe("Update Staff", () => {
    it("should call next() method with error if staffService.update method failed", async () => {
        const error = new Error("Update Error");
        mockRequest.params = { id: "67cb20351fc66921c7584a23" };
        mockRequest.body = mockRequestBody;
        vi.spyOn(staffService, "update").mockRejectedValueOnce(error);
        await staffController.updateStaff(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(error);
    });

    it("should return 201 if staffService.update runs successfully", async () => {
        const mockUpdatedStaff = {
            _id: "67cb20351fc66921c7584a24",
            firstName: "first2",
            lastName: "last2",
            phone: "1234567802",
            email: "email2@localhost.com",
            department: "Department2",
            image: {
                data: Buffer.from("2131231231", "hex"),
                contentType: "image/png",
            },
        };

        mockRequest.body = {
            image: {
                data: Buffer.from("2131231231", "hex"),
                contentType: "image/png",
            },
        };

        vi.spyOn(staffService, "update").mockResolvedValueOnce(
            mockUpdatedStaff
        );
        await staffController.updateStaff(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockCreateSuccessDataResult(200, mockUpdatedStaff));
    });
});

describe("Remove staff", () => {
    it("should return 500 if staffService.remove method failed", async () => {
        const error = new Error("Remove Error");
        mockRequest.params = { id: "67cb20351fc66921c7584a23" };
        mockRequest.body = mockRequestBody;
        vi.spyOn(staffService, "remove").mockRejectedValueOnce(error);
        await staffController.removeStaff(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(error);
    });

    it("should return 200 if staffService.remove runs successfully", async () => {
        mockRequest.params = { id: "67cb20351fc66921c7584a23" };
        vi.spyOn(staffService, "remove").mockResolvedValueOnce();
        await staffController.removeStaff(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockCreateSuccessResult).toHaveBeenCalledWith(
            200,
            `Staff has id:${mockRequest.params.id} is removed.`
        );
    });
});

describe("getAllStaffWithPagination", () => {
    mockRequest.query = { page: 1, pageSize: 10 };
    it("should return 500 if staffService.getAllWithPagination method failed", async () => {
        const error = new Error("Pagination Error");
        vi.spyOn(staffService, "getAllWithPagination").mockRejectedValueOnce(
            error
        );
        await staffController.getAllStaffWithPagination(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(error);
    });

    it("should return 200 if staffService.getAllWithPagination runs successfully", async () => {
        const mockStaffArrayWithPagination = {
            metadata: {
                totalCount: 10,
                page: mockRequest.page,
                pageSize: mockRequest.pageSize,
            },
            data: [
                { _id: "67cb20351fc66921c7584a23", firstName: "fN1" },
                { _id: "67cb20351fc66921c7584a24", firstName: "fN2" },
                { _id: "67cb20351fc66921c7584a25", firstName: "fN3" },
                { _id: "467cb20351fc66921c7584a26", firstName: "fN4" },
            ],
        };
        vi.spyOn(staffService, "getAllWithPagination").mockResolvedValueOnce(
            mockStaffArrayWithPagination
        );
        await staffController.getAllStaffWithPagination(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalled(200);
        expect(
            mockCreateSuccessDataResult(
                200,
                mockStaffArrayWithPagination.data,
                mockStaffArrayWithPagination.metadata,
                "Paginated staffs are listed successfully."
            )
        );
    });
});

describe("getStaffWithId", () => {
    mockRequest.params = { id: "67cb20351fc66921c7584a23" };

    it("should return 500 if staffService.getStaffWithId metod failed.", async () => {
        const error = new Error(
            `Staff has id: ${mockRequest.params.id} not found.`
        );
        vi.spyOn(staffService, "getStaffWithId").mockRejectedValueOnce(error);
        await staffController.getStaffWithId(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(error);
    });

    it("should return 200 if staffService.getStaffWithId run successfully.", async () => {
        const getStaffWithId = vi
            .spyOn(staffService, "getStaffWithId")
            .mockResolvedValueOnce(mockStaffArray[0]);
        await staffController.getStaffWithId(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(getStaffWithId).toHaveBeenCalledWith("67cb20351fc66921c7584a23");
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockCreateSuccessDataResult).toHaveBeenCalledWith(
            200,
            mockStaffArray[0],
            null,
            `Staff with id:${mockStaffArray[0]._id} is found.`
        );
    });
});

describe("getDepartmentList", () => {
    it("should return 500 if staffService.getDepartmentList method failed", async () => {
        const error = new Error("Departments not found");
        const mockGetDepartmentList = vi
            .spyOn(staffService, "getDepartmentList")
            .mockRejectedValueOnce(error);
        await staffController.getDepartmentList(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockGetDepartmentList).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(error);
    });

    it("should return 200 if staffService.getDepartmentList run successfully", async () => {
        const mockDepartmentList = ["department1", "department2"];
        const mockGetDepartmentList = vi
            .spyOn(staffService, "getDepartmentList")
            .mockResolvedValueOnce(mockDepartmentList);
        await staffController.getDepartmentList(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockGetDepartmentList).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalled();
        expect(mockCreateSuccessDataResult).toHaveBeenCalledWith(
            200,
            mockDepartmentList,
            null,
            "Departments are listed successfully."
        );
    });
});
