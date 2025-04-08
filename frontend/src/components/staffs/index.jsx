import React from "react";
import Pagination from "../Pagination";
import StaffActionBar from "./StaffActionBar";
import StaffFilterBar from "./StaffFilterBar";
import StaffTable from "./StaffTable";

const Staffs = () => {
    let staffArray = [];
    for (let i = 0; i <= 25; i++) {
        staffArray.push({
            id: i + 1,
            firstName: "First Name " + i,
            lastName: "Last Name " + i,
            phone: "12345678" + i < 10 ? "0" + i : i,
            email: "FirstName" + i + "@localhost.com",
            department: "Department" + i,
        });
    }

    return (
        <>
            <StaffActionBar />
            <StaffFilterBar />
            <StaffTable staffArray={staffArray} />
            <Pagination />
        </>
    );
};

export default Staffs;
