import React, { useContext, useEffect } from "react";
import Pagination from "../../components/Pagination";
import StaffActionBar from "./StaffActionBar";
import StaffTable from "./StaffTable";
import StaffAddUpdateDetailModal from "./StaffAddUpdateDetailModal";
import StaffFilterContainer from "./StaffFilterContainer";
import { StaffListContext } from "../../contexts/StaffListContext";
import { getAllStaffWithPagination } from "../../api/services/StaffService";
import { toast } from "react-toastify";

const StaffList = () => {
    // let staffArray = [];
    // for (let i = 0; i <= 25; i++) {
    //     staffArray.push({
    //         id: i + 1,
    //         createDate: "23.04.2024 18:17",
    //         firstName: "First Name " + i,
    //         lastName: "Last Name " + i,
    //         phone: "12345678" + (i < 10 ? "0" + i : i),
    //         email: "FirstName" + i + "@localhost.com",
    //         department: "Department" + i,
    //         image: null,
    //     });
    // }

    const { populateStaffListItems, pagination, totalCount, setTotalCount } =
        useContext(StaffListContext);

    useEffect(() => {
        getAllStaffWithPagination(pagination.page, pagination.pageSize)
            .then((response) => {
                populateStaffListItems(response.data);
                setTotalCount(response.metadata.totalCount);
            })
            .catch((error) => {
                console.log(error);
                toast.error(
                    "There was an issue while fetching staffs from server.",
                );
            });
    }, [pagination, totalCount]);

    return (
        <>
            <StaffActionBar />
            <StaffFilterContainer />
            <StaffTable />
            <Pagination />
            <StaffAddUpdateDetailModal />
        </>
    );
};

export default StaffList;
