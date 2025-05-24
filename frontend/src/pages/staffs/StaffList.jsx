import { useContext, useEffect } from "react";
import Pagination from "../../components/Pagination";
import StaffActionBar from "./StaffActionBar";
import StaffTable from "./StaffTable";
import StaffAddUpdateDetailModal from "./StaffAddUpdateDetailModal";
import StaffFilterContainer from "./StaffFilterContainer";
import { StaffListContext } from "../../contexts/StaffListContext";
import { getAllStaffWithPagination } from "../../api/services/StaffService";
import { toast } from "react-toastify";

const StaffList = () => {
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
