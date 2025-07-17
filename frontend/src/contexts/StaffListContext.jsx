import { useState, createContext, useReducer } from "react";
import staffListReducer from "../reducers/staffListReducer";

export const StaffListContext = createContext();

export const StaffListContextProvider = ({ children }) => {
    const searchFilterInitialValues = {
        department: "",
        column: "",
        keyword: "",
    };

    const [selectedStaff, setSelectedStaff] = useState({});
    const [items, dispatch] = useReducer(staffListReducer, []);
    const [pagination, setPagination] = useState({ page: 1, pageSize: 5 });
    const [totalCount, setTotalCount] = useState(0);
    const [searchFilters, setSearchFilters] = useState(
        searchFilterInitialValues,
    );
    const [sorting, setSorting] = useState({
        field: "createdAt",
        order: "desc",
    });
    const [departments, setDepartments] = useState([]);

    const selectStaff = (staff) => {
        setSelectedStaff(staff);
    };

    const populateStaffListItems = (staffArray) => {
        dispatch({ type: "POPULATE_ITEMS", payload: staffArray });
    };

    const staffListContext = {
        selectedStaff,
        selectStaff,
        items,
        populateStaffListItems,
        pagination,
        setPagination,
        sorting,
        setSorting,
        totalCount,
        setTotalCount,
        searchFilters,
        setSearchFilters,
        departments,
        setDepartments,
    };

    return (
        <StaffListContext.Provider value={staffListContext}>
            {children}
        </StaffListContext.Provider>
    );
};
