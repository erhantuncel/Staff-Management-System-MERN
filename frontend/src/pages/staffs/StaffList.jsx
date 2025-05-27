import { useContext, useEffect } from "react";
import Pagination from "../../components/Pagination";
import StaffActionBar from "./StaffActionBar";
import StaffTable from "./StaffTable";
import StaffAddUpdateDetailModal from "./StaffAddUpdateDetailModal";
import StaffFilterContainer from "./StaffFilterContainer";
import { StaffListContext } from "../../contexts/StaffListContext";
import { getStaffsByDepartmentAndQueryParamsPaginated } from "../../api/services/StaffService";
import { toast } from "react-toastify";

const StaffList = () => {
    const {
        populateStaffListItems,
        items,
        pagination,
        totalCount,
        setTotalCount,
        searchFilters,
    } = useContext(StaffListContext);

    useEffect(() => {
        getStaffsByDepartmentAndQueryParamsPaginated(
            pagination.page,
            pagination.pageSize,
            searchFilters.department,
            searchFilters.column,
            searchFilters.keyword,
        )
            .then((response) => {
                populateStaffListItems(response.data);
                setTotalCount(response.metadata.totalCount);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Staff not found based on the filters");
                populateStaffListItems([]);
            });
    }, [pagination, searchFilters]);

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
