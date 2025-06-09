import { afterAll, beforeAll, test, describe, expect } from "vitest";
import User from "../../db/user.model";
import { connectDb, disconnectDb } from "../../config/db";
import User from "../../db/user.model";
const userObj = {
    userName: "user1",
    password: "password1",
};

const user = new User(userObj);

describe("User model testing", () => {
    beforeAll(async () => {
        await connectDb();
    });

    afterAll(async () => {
        await User.collection.drop();
        await disconnectDb();
    });

    test("User model create test", async () => {
        const user = new User(userObj);
        const savedUser = await user.save();
        expect(savedUser).toBeDefined();
        expect(savedUser.userName).toBe(user.userName);
        expect(savedUser.password).toBe(user.password);
    });

    test("User model read test", async () => {
        await user.save();
        const fetchedUser = await User.findOne({ _id: user.id });
        expect(fetchedUser).toBeDefined();
        expect(fetchedUser).toMatchObject(user._doc);
    });

    test("User model update test", async () => {
        const userUpdateObj = {
            userName: "user1Upd",
            password: "password1Upd",
        };

        await User.updateOne({ _id: user.id }, { ...userUpdateObj });
        const fetchedUser = await User.findOne({ _id: user.id });
        expect(fetchedUser).toBeDefined();
        expect(fetchedUser.userName).toBe("user1Upd");
        expect(fetchedUser.password).toBe("password1Upd");
    });

    test("User model delete test", async () => {
        await User.deleteOne({ _id: user.id });
        const fetchedUser = await User.findOne({ _id: user.id });
        expect(fetchedUser).toBeNull();
    });
});
