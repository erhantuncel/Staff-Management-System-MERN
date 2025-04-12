import React from "react";
import ColumnFilter from "./ColumnFilter";
import PageSizeFilter from "./PageSizeFilter";

const StaffFilterContainer = () => {
    return (
        <div className="mb-2 grid grid-cols-2">
            <div className="flex content-center gap-1 justify-self-start">
                <PageSizeFilter />
            </div>
            <div className="flex justify-end gap-1">
                <ColumnFilter />
            </div>
        </div>
    );
};

export default StaffFilterContainer;
