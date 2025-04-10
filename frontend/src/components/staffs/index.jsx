import React, { useState } from "react";
import Pagination from "../Pagination";
import StaffActionBar from "./StaffActionBar";
import StaffFilterBar from "./StaffFilterBar";
import StaffTable from "./StaffTable";
import StaffAddUpdateDetailModal from "./StaffAddUpdateDetailModal";

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

    const modalInitialState = { isOpen: false, type: "add" };

    const [staffsData, setStaffsData] = useState(staffArray);
    const [modalState, setModalState] = useState(modalInitialState);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const handleOpenModal = (type, staff) => {
        staff && setSelectedStaff(staff);
        setModalState({ isOpen: true, type });
    };

    return (
        <>
            <StaffActionBar handleOpenModal={handleOpenModal} />
            <StaffFilterBar />
            <StaffTable
                staffsData={staffsData}
                handleOpenModal={handleOpenModal}
            />
            <Pagination />
            <StaffAddUpdateDetailModal
                modalState={modalState}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                staffInfo={selectedStaff}
            />
        </>
    );
};

export default Staffs;
