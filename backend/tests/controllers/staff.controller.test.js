import { describe, expect, it, vi } from "vitest";
import staffController from "../../controllers/staff.controller.js";
import staffService from "../../services/staff.service.js";
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

const mockRequest = {};

const mockResponse = {
    json: vi.fn(),
    status: vi.fn(() => mockResponse),
};

const mockNext = vi.fn();

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
        const mockStaffArray = [
            {
                _id: "67c0b6007292b50a4fa00aa1",
                firstName: "first1",
                lastName: "last1",
                phone: "1234567801",
                email: "email1@localhost.com",
                department: "Department1",
            },
            {
                _id: "67c0b6007292b50a4fa00aa2",
                firstName: "first2",
                lastName: "last2",
                phone: "1234567802",
                email: "email2@localhost.com",
                department: "Department2",
            },
        ];
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
