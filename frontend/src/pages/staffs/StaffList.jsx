import { useContext, useEffect } from "react";
import Pagination from "../../components/Pagination";
import StaffActionBar from "./StaffActionBar";
import StaffTable from "./StaffTable";
import StaffAddUpdateDetailModal from "./StaffAddUpdateDetailModal";
import StaffFilterContainer from "./StaffFilterContainer";
import { StaffListContext } from "../../contexts/StaffListContext";
import { getAllStaffs } from "../../api/services/StaffService";
import { getDistinctDepartments } from "../../api/services/DepartmentService";
import Alert from "../../components/Alert";
import { useTranslation } from "react-i18next";

const StaffList = () => {
    const { t } = useTranslation();

    const {
        populateStaffListItems,
        items,
        pagination,
        setTotalCount,
        searchFilters,
        setDepartments,
    } = useContext(StaffListContext);

    useEffect(() => {
        getAllStaffs(
            searchFilters.department,
            searchFilters.column,
            searchFilters.keyword,
            pagination.page,
            pagination.pageSize,
            null,
            null,
        )
            .then((response) => {
                populateStaffListItems(response.data);
                setTotalCount(response.metadata.totalCount);
            })
            .catch((error) => {
                console.log(error);
                populateStaffListItems([]);
            });
    }, [pagination, searchFilters]);

    useEffect(() => {
        getDistinctDepartments().then((departmentResponse) => {
            let departmentsArray = [];
            departmentResponse.data.map((department, index) => {
                departmentsArray.push({
                    key: index + 1,
                    label: department,
                    value: department,
                });
            });
            setDepartments(departmentsArray);
        });
    }, [items]);

    return (
        <>
            <StaffActionBar />
            <StaffFilterContainer />
            {items.length > 0 ? (
                <>
                    <StaffTable />
                    <Pagination />
                </>
            ) : (
                <Alert message={t("STAFF.alert.staff.not.found")} />
            )}
            <StaffAddUpdateDetailModal />
        </>
    );
};

export default StaffList;
