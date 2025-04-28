import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import StaffActionBar from "./StaffActionBar";
import StaffTable from "./StaffTable";
import StaffAddUpdateDetailModal from "./StaffAddUpdateDetailModal";
import StaffFilterContainer from "./StaffFilterContainer";

const StaffList = () => {
    let staffArray = [];
    for (let i = 0; i <= 25; i++) {
        staffArray.push({
            id: i + 1,
            createDate: "23.04.2024 18:17",
            firstName: "First Name " + i,
            lastName: "Last Name " + i,
            phone: "12345678" + (i < 10 ? "0" + i : i),
            email: "FirstName" + i + "@localhost.com",
            department: "Department" + i,
        });
    }

    const modalInitialState = { isOpen: false, type: "add" };
    // const empyStaffInfoForNewStaff = {
    //     firstName: "",
    //     lastName: "",
    //     phone: "",
    //     email: "",
    //     department: "",
    //     image: "",
    // };
    const empyStaffInfoForNewStaff = {
        firstName: null,
        lastName: null,
        phone: null,
        email: null,
        department: null,
        image: null,
    };

    const [staffsData, setStaffsData] = useState(staffArray);
    const [modalState, setModalState] = useState(modalInitialState);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const handleOpenModal = (type, staff) => {
        type === "add"
            ? setSelectedStaff(empyStaffInfoForNewStaff)
            : setSelectedStaff(staff);
        setModalState({ isOpen: true, type });
    };

    const handleChangeModalState = (state) => {
        setModalState(state);
    };

    return (
        <>
            <StaffActionBar handleOpenModal={handleOpenModal} />
            <StaffFilterContainer />
            <StaffTable
                staffsData={staffsData}
                handleOpenModal={handleOpenModal}
            />
            <Pagination />
            <StaffAddUpdateDetailModal
                modalState={modalState}
                changeModalState={handleChangeModalState}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                staffInfo={selectedStaff}
            />
        </>
    );
};

export default StaffList;
