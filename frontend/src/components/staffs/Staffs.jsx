import React from "react";
import Pagination from "../Pagination";
import StaffTable from "./StaffTable";
import StaffActionBar from "./StaffActionBar";
import StaffFilterBar from "./StaffFilterBar";

const Staffs = () => {
    let staffArray = [];
    for (let i = 0; i <= 25; i++) {
        staffArray.push({
            id: i + 1,
            firstName: "First Name " + i,
            lastName: "Last Name " + i,
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
