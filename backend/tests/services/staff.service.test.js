import { beforeEach, describe, expect, it, test, vi } from "vitest";
import staffService from "../../services/staff.service.js";
import Staff from "../../db/staff.model.js";

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
        _id: "67bd7a52419b4dfb2da00aa2",
        firstName: "first2",
        lastName: "last2",
        phone: "1234567802",
        email: "email2@localhost.com",
        department: "Department2",
    },
    {
        _id: "67bd7a52419b4dfb2da00aa3",
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
});
