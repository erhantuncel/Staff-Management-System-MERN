import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Button from "./form/Button";
import { StaffListContext } from "../contexts/StaffListContext";

const Pagination = () => {
    const { t } = useTranslation();

    const { pagination, setPagination, totalCount } =
        useContext(StaffListContext);

    const page = parseInt(pagination.page);
    const pageSize = parseInt(pagination.pageSize);
    const pageCount = Math.ceil(totalCount / pageSize);
    const pageNumberArray = [];
    for (let i = 1; i <= pageCount; i++) {
        pageNumberArray.push(i);
    }

    return (
        <div className="mb-5 hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-gray-700">
                    {t("STAFF.list.table.label.entryInformation", {
                        totalEntry: totalCount,
                        rangeStart: page * pageSize - pageSize + 1,
                        rangeEnd:
                            page * pageSize > totalCount
                                ? totalCount
                                : page * pageSize,
                    })}
                </p>
            </div>
            <div className="join">
                {pageNumberArray?.map((number) => (
                    <Button
                        key={number}
                        className={`join-item btn btn-sm btn-soft ${page === number && "btn-active"}`}
                        onClick={() =>
                            setPagination({ ...pagination, page: number })
                        }
                    >
                        {number}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
