import { beforeEach, describe, expect, it, vi } from "vitest";
import User from "../../db/user.model";
import utils from "../../utils";
import userService from "../../services/user.service";
import ValidationError from "../../utils/Errors/ValidationError";
import NotFoundError from "../../utils/Errors/NotFoundError";

vi.mock("../../db/user.model.js");

const mockUserToSave = {
    userName: "user1user1user1",
    password: "5char",
};

describe("User Service", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("Create user", () => {
        const mockValidateSync = vi.spyOn(User.prototype, "validateSync");
        const mockGetInvalidFields = vi.spyOn(utils, "getInvalidFields");

        it("should thrown ValidationError if userObject is not valid", async () => {
            const validationResult = [
                { userName: "User name must be maximum 10 characters." },
                { password: "Password must be at least 8 characters" },
            ];

            const invalidFields = {
                userName: "User name must be 10 characters.",
                password: "Password must be at least 8 characters",
            };

            mockValidateSync.mockImplementationOnce(() => validationResult);
            mockGetInvalidFields.mockReturnValueOnce(invalidFields);

            await expect(
                userService.create(mockUserToSave)
            ).rejects.toThrowError(
                new ValidationError("User validation is failed.", invalidFields)
            );
            expect(mockValidateSync).toHaveBeenCalled();
            expect(mockValidateSync).toHaveReturnedWith(validationResult);
            expect(mockGetInvalidFields).toHaveBeenCalled();
            expect(mockGetInvalidFields).toHaveBeenCalledWith(validationResult);
        });

        it("should return saved user if userObject is valid", async () => {
            mockValidateSync.mockImplementationOnce(() => undefined);
            const mockUserSaved = (mockUserToSave._id =
                "67cb20351fc66921c7584a26");
            const mockUserSave = vi
                .spyOn(User.prototype, "save")
                .mockReturnValueOnce(mockUserSaved);
            const mockUserReturned = await userService.create(mockUserToSave);
            expect(mockValidateSync).toHaveBeenCalled();
            expect(mockValidateSync).toHaveReturnedWith(undefined);
            expect(mockGetInvalidFields).not.toHaveBeenCalled();
            expect(mockUserSave).toHaveBeenCalled();
            expect(mockUserReturned._id).toBe(mockUserSaved._id);
        });
    });

    describe("Find by userName", () => {
        it("should thrown Validation Error if userName is missing", async () => {
            const mockInvalidUserName = "";
            await expect(
                userService.findByUserName(mockInvalidUserName)
            ).rejects.toThrow(
                new ValidationError("Invalid or missing userName")
            );
        });

        it("should thrown NotFoundError if user not found", async () => {
            const missingUser = "userNotExist";
            vi.spyOn(User, "findOne").mockReturnValueOnce(null);
            await expect(
                userService.findByUserName(missingUser)
            ).rejects.toThrow(
                new NotFoundError(
                    `User with username ${missingUser} not found.`
                )
            );
        });

        it("should find user if findByUserName method runs successfully", async () => {
            const mockUserReturnedFromDb = {
                _id: "67cb20351fc66921c7584a23",
                userName: "user1",
                password: "password1",
            };

            const mockUserFindByUserName = vi
                .spyOn(User, "findOne")
                .mockResolvedValueOnce(mockUserReturnedFromDb);

            const userFound = await userService.findByUserName(
                mockUserReturnedFromDb.userName
            );

            expect(mockUserFindByUserName).toHaveBeenCalledWith({
                userName: mockUserReturnedFromDb.userName,
            });
            expect(userFound._id).toBe(mockUserReturnedFromDb._id);
        });
    });
});
