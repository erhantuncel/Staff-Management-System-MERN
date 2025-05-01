import React, { useEffect, useState } from "react";
import ColumnFilter from "./ColumnFilter";
import PageSizeFilter from "./PageSizeFilter";

const StaffFilterContainer = ({ setStaffsData }) => {
    const filterIntialValues = {
        department: "",
        column: "",
        keyword: "",
        pageSize: 5,
    };

    const [staffFilter, setStaffFilter] = useState(filterIntialValues);

    useEffect(() => {
        console.log(staffFilter);
    }, [staffFilter]);

    return (
        <div className="mb-2 grid grid-cols-2">
            <PageSizeFilter
                staffFilter={staffFilter}
                setStaffFilter={setStaffFilter}
            />
            <ColumnFilter
                staffFilter={staffFilter}
                setStaffFilter={setStaffFilter}
                setStaffsData={setStaffsData}
            />
        </div>
    );
};

export default StaffFilterContainer;
