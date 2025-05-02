import { useState, createContext, useReducer } from "react";
import staffListReducer from "../reducers/staffListReducer";

export const StaffListContext = createContext();

export const StaffListContextProvider = ({ children }) => {
    const [selectedStaff, setSelectedStaff] = useState({});
    const [items, dispatch] = useReducer(staffListReducer, []);

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
    };

    return (
        <StaffListContext.Provider value={staffListContext}>
            {children}
        </StaffListContext.Provider>
    );
};
