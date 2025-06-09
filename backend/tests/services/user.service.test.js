import { beforeEach, describe, expect, it, vi } from "vitest";
import User from "../../db/user.model";
import utils from "../../utils";
import userService from "../../services/user.service";
import ValidationError from "../../utils/Errors/ValidationError";

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
});
