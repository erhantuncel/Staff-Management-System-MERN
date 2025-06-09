import { describe, expect, it, vi } from "vitest";
import utils from "../../utils";
import userController from "../../controllers/user.controller";
import userService from "../../services/user.service";

vi.mock("../../services/user.service.js");

const mockCreateSuccessDataResult = vi.spyOn(utils, "createSuccessDataResult");

const mockRequest = {};

const mockResponse = {
    json: vi.fn(),
    status: vi.fn(() => mockResponse),
};

const mockNext = vi.fn();

const mockRequestBody = {
    userName: "user1",
    password: "password",
    passwordToConfirm: "password",
};

describe("Create User", () => {
    mockRequest.body = mockRequestBody;

    it("should return 501 if userService.create method thrown an error", async () => {
        mockRequest.body.userName = "user1user1user1user1";
        const error = new Error("Server Error");
        vi.spyOn(userService, "create").mockRejectedValueOnce(error);
        await userController.createUser(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalled();
    });

    it("should return 201 if user is created successfully", async () => {
        const mockUser = mockRequest.body;
        vi.spyOn(userService, "create").mockResolvedValueOnce(mockUser);
        await userController.createUser(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalled();
        expect(mockCreateSuccessDataResult).toHaveBeenCalledWith(201, mockUser);
    });
});
