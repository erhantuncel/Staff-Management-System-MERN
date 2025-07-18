import React, { useContext } from "react";
import { StaffListContext } from "../../contexts/StaffListContext";
import ArrowsUpDownIcon from "../../components/icons/ArrowsUpDownIcon";
import ArrowLongDownIcon from "../../components/icons/ArrowLongDownIcon";
import ArrowLongUpIcon from "../../components/icons/ArrowLongUpIcon";

const TableHeadColumn = ({ title = "", fieldName, isSortable = false }) => {
    const { sorting, setSorting } = useContext(StaffListContext);

    const handleClick = () => {
        setSorting({
            field: fieldName,
            order: sorting.order === "asc" ? "desc" : "asc",
        });
    };

    return isSortable ? (
        <div
            className="flex cursor-pointer items-center gap-x-0.5"
            onClick={handleClick}
        >
            {`${title} `}
            {sorting.field !== fieldName ? (
                <ArrowsUpDownIcon type="micro" />
            ) : sorting.order === "asc" ? (
                <ArrowLongDownIcon type="micro" />
            ) : (
                <ArrowLongUpIcon type="micro" />
            )}
        </div>
    ) : (
        <div>{title}</div>
    );
};

export default TableHeadColumn;
