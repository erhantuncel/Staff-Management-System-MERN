import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import utils from "../../utils";
import userService from "../../services/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticationController } from "../../controllers";
import NotFoundError from "../../utils/Errors/NotFoundError";
import ValidationError from "../../utils/Errors/ValidationError";
import User from "../../db/user.model";
import { Document } from "mongoose";

vi.mock("../../services/user.service.js");

const mockCreateSuccessDataResult = vi.spyOn(utils, "createSuccessDataResult");

const mockRequest = {};

const mockResponse = {
    json: vi.fn(),
    status: vi.fn(() => mockResponse),
};

const mockNext = vi.fn();

const mockPassword = {
    password: "password1",
    hashed: "$2b$10$EEaA/OCt55mTE8sJqeeaMeaOxMIoj6FQegl.P2tc0S.5ERiMIw8.a",
};

describe("Register User", () => {
    mockRequest.body = {
        userName: "user1",
        password: mockPassword.password,
        passwordToConfirm: mockPassword.password,
    };

    it("should return 501 if userService.create method thrown an error", async () => {
        mockRequest.body.userName = "user1user1user1user1";
        const error = new Error("Server Error");
        vi.spyOn(userService, "create").mockRejectedValueOnce(error);
        await authenticationController.register(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockNext).toHaveBeenCalled();
    });

    it("should return 201 if user is created successfully", async () => {
        const mockUser = mockRequest.body;
        vi.spyOn(userService, "create").mockResolvedValueOnce(mockUser);
        await authenticationController.register(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalled();
        expect(mockCreateSuccessDataResult).toHaveBeenCalledWith(201, mockUser);
    });
});

describe("Login", () => {
    it("should throw NotFoundError if user not found.", async () => {
        mockRequest.body = {
            userName: "notExistUser",
            password: mockPassword.hashed,
        };

        const error = new NotFoundError("User not found");
        const mockFindByUserName = vi
            .spyOn(userService, "findByUserName")
            .mockRejectedValueOnce(error);
        await authenticationController.login(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockFindByUserName).toHaveBeenCalled();
        expect(mockFindByUserName).toHaveBeenCalledWith(
            mockRequest.body.userName
        );
        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(error);
    });

    it("should throw ValidationError if pasword is invalid.", async () => {
        mockRequest.body = {
            userName: "user1",
            password: "invalidPassword",
        };

        const returnedUser = {
            ...mockRequest.body,
            password: mockPassword.hashed,
            _id: "684d55eb26aaddc2bce96802",
        };

        const mockFindByUserName = vi
            .spyOn(userService, "findByUserName")
            .mockReturnValueOnce(returnedUser);

        const mockBcryptCompare = vi
            .spyOn(bcrypt, "compare")
            .mockReturnValueOnce(false);
        await authenticationController.login(
            mockRequest,
            mockResponse,
            mockNext
        );
        expect(mockFindByUserName).toHaveBeenCalled();
        expect(mockFindByUserName).toHaveBeenCalledWith(
            mockRequest.body.userName
        );
        expect(mockFindByUserName).toHaveReturnedWith(returnedUser);
        expect(mockBcryptCompare).toHaveBeenCalled();
        expect(mockBcryptCompare).toHaveBeenCalledWith(
            mockRequest.body.password,
            returnedUser.password
        );
        expect(mockBcryptCompare).toReturnWith(false);
        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(
            new ValidationError("Password is invalid.", null)
        );
    });

    it("should return 200 response if login is successful.", async () => {
        mockRequest.body = {
            userName: "user1",
            password: mockPassword.hashed,
        };

        const returnedUser = {
            ...mockRequest.body,
            password: mockPassword.hashed,
            _id: "684d55eb26aaddc2bce96802",
        };

        const mockFindByUserName = vi
            .spyOn(userService, "findByUserName")
            .mockReturnValueOnce(returnedUser);

        const mockBcryptCompare = vi
            .spyOn(bcrypt, "compare")
            .mockReturnValueOnce(true);

        const mockJwtSign = vi.spyOn(jwt, "sign").mockReturnValueOnce("token");

        await authenticationController.login(
            mockRequest,
            mockResponse,
            mockNext
        );

        expect(mockFindByUserName).toHaveBeenCalled();
        expect(mockFindByUserName).toHaveBeenCalledWith(
            mockRequest.body.userName
        );
        expect(mockFindByUserName).toHaveReturnedWith(returnedUser);
        expect(mockBcryptCompare).toHaveBeenCalled();
        expect(mockBcryptCompare).toHaveBeenCalledWith(
            mockRequest.body.password,
            returnedUser.password
        );
        expect(mockBcryptCompare).toReturnWith(true);
        expect(mockJwtSign).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalled();
        expect(mockCreateSuccessDataResult).toHaveBeenCalled();
        expect(mockCreateSuccessDataResult).toHaveBeenCalledWith(
            200,
            { ...returnedUser, token: "token" },
            null,
            "Login successful."
        );
    });
});
