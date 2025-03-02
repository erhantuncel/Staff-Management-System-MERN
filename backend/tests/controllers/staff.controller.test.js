import { describe, expect, it, vi } from "vitest";
import staffController from "../../controllers/staff.controller.js";
import staffService from "../../services/staff.service.js";
import path from "path";
import { truncate } from "fs";

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

const mockRequest = {};

const mockResponse = {
    json: vi.fn(),
    status: vi.fn(() => mockResponse),
};

const mockNext = vi.fn();

const mockStaffArray = [
    {
        _id: "1",
        firstName: "first1",
        lastName: "last1",
        phone: "1234567801",
        email: "email1@localhost.com",
        department: "Department1",
    },
    {
        _id: "2",
        firstName: "first2",
        lastName: "last2",
        phone: "1234567802",
        email: "email2@localhost.com",
        department: "Department2",
    },
];

describe("Get all staff", () => {
    it("should return 500 when getAll method failed", async () => {
        vi.mocked(staffService.getAll).mockRejectedValueOnce(
            new Error("Server Error")
        );
        await staffController.getAllStaff(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalled();
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: false,
            message: "Server Error",
        });
    });

    it("should return 200 when getAll run successfully", async () => {
        vi.mocked(staffService.getAll).mockResolvedValueOnce(mockStaffArray);
        await staffController.getAllStaff(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            data: mockStaffArray,
        });
    });
});

describe("Create Staff", () => {
    const mockRequest = {
        body: {
            firstName: "first1",
            lastName: "last1",
            phone: "1234567801",
            email: "email1@localhost.com",
            department: "Department1",
        },
    };

    it("should return 501 if upload function thrown an error", async () => {
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
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(501);
        expect(mockResponse.json).toHaveBeenCalled();
    });

    it("should return 501 if staffService.create method thrown an error", async () => {
        vi.spyOn(staffService, "create").mockRejectedValueOnce();
        await staffController.createStaff(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(501);
        expect(mockResponse.json).toHaveBeenCalled();
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
    });
});

describe("Update Staff", () => {
    it("should return 500 if staffService.update method failed", async () => {
        vi.spyOn(staffService, "update").mockRejectedValueOnce("Update Error");
        await staffController.updateStaff(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it("should return 201 if staffService.update runs successfully", async () => {
        const mockUpdatedStaff = {
            _id: "67bd7a52419b4dfb2da00aa2",
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

        vi.spyOn(staffService, "update").mockResolvedValueOnce(
            mockUpdatedStaff
        );
        await staffController.updateStaff(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            data: mockUpdatedStaff,
        });
    });
});

describe("Remove staff", () => {
    it("should return 500 if staffService.remove method failed", async () => {
        vi.spyOn(staffService, "remove").mockRejectedValueOnce("Remove Error");
        await staffController.removeStaff(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it("should return 200 if staffService.remove runs successfully", async () => {
        vi.spyOn(staffService, "remove").mockResolvedValueOnce();
        await staffController.removeStaff(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            message: "Staff is removed.",
        });
    });
});

describe("getAllStaffWithPagination", () => {
    it("should return 500 if staffService.getAllWithPagination method failed", async () => {
        const mockRequest = {
            query: { page: 1, pageSize: 10 },
        };
        vi.spyOn(staffService, "getAllWithPagination").mockRejectedValueOnce(
            "Pagination Error"
        );
        await staffController.getAllStaffWithPagination(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it("should return 200 if staffService.getAllWithPagination runs successfully", async () => {
        const mockRequest = {
            query: { page: 1, pageSize: 10 },
        };

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
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            data: mockStaffArrayWithPagination,
        });
    });
});

describe("getStaffWithId", () => {
    it("should return 500 if staffService.getStaffWithId metod failed.", async () => {
        const mockRequest = {
            params: { id: "1" },
        };

        vi.spyOn(staffService, "getStaffWithId").mockRejectedValueOnce(
            "Staff has id: 1 not found."
        );
        await staffController.getStaffWithId(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(500);
    });

    it("should return 200 if staffService.getStaffWithId run successfully.", async () => {
        const mockRequest = {
            params: { id: "1" },
        };
        const getStaffWithId = vi
            .spyOn(staffService, "getStaffWithId")
            .mockResolvedValueOnce(mockStaffArray[0]);
        await staffController.getStaffWithId(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(getStaffWithId).toHaveBeenCalledWith("1");
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            data: mockStaffArray[0],
        });
    });
});

describe("getDepartmentList", () => {
    it("should return 500 if staffService.getDepartmentList method failed", async () => {
        const mockGetDepartmentList = vi
            .spyOn(staffService, "getDepartmentList")
            .mockRejectedValueOnce("Distinct departments not found");
        await staffController.getDepartmentList(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockGetDepartmentList).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalled(500);
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
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            data: mockDepartmentList,
        });
    });
});
