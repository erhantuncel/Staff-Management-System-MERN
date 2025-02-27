import { connectDb, disconnectDb } from "../../config/db.js";
import Staff from "../../db/staff.model.js";
import { afterAll, beforeAll, test, describe, expect } from "vitest";

const staffObj = {
    firstName: "first",
    lastName: "last",
    phone: "1234567890",
    email: "email@localhost.com",
    department: "Department",
    image: {
        data: Buffer.from("7123jasxs89812", "hex"),
        contentType: "image/png",
    },
};
const staff = new Staff(staffObj);

describe("Staff model testing", () => {
    beforeAll(async () => {
        await connectDb();
    });

    afterAll(async () => {
        await Staff.collection.drop();
        await disconnectDb();
    });

    test("Staff model create test", async () => {
        const staff = new Staff(staffObj);
        const savedStaff = await staff.save();
        expect(savedStaff).toBeDefined();
        expect(savedStaff.firstName).toBe(staff.firstName);
        expect(savedStaff.lastName).toBe(staff.lastName);
        expect(savedStaff.phone).toBe(staff.phone);
        expect(savedStaff.email).toBe(staff.email);
        expect(savedStaff.department).toBe(staff.department);
        expect(savedStaff.image).toBe(staff.image);
    });

    test("Staff model read test", async () => {
        await staff.save();
        const fetchedStaff = await Staff.findOne({ _id: staff.id });
        expect(fetchedStaff).toBeDefined();
        expect(fetchedStaff).toMatchObject(staff._doc);
    });

    test("Staff model update test", async () => {
        const staffUpdateObj = {
            firstName: "firstUpd",
            lastName: "lastUpd",
            phone: "1234567891",
            email: "emailUpd@localhost.com",
            department: "DepartmentUpd",
            image: {
                data: Buffer.from("7123jasxs89812", "hex"),
                contentType: "image/png",
            },
        };

        await Staff.updateOne({ _id: staff._id }, { ...staffUpdateObj });
        const fetchedStaff = await Staff.findOne({ _id: staff._id });
        expect(fetchedStaff).toBeDefined();
        expect(fetchedStaff.firstName).toBe("firstUpd");
        expect(fetchedStaff.lastName).toBe("lastUpd");
        expect(fetchedStaff.phone).toBe("1234567891");
        expect(fetchedStaff.email).toBe("emailUpd@localhost.com");
        expect(fetchedStaff.department).toBe("DepartmentUpd");
    });

    test("Staff model delete test", async () => {
        await Staff.deleteOne({ _id: staff._id });
        const fetchedStaff = await Staff.findOne({ _id: staff._id });
        expect(fetchedStaff).toBeNull();
    });
});
