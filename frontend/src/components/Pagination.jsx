import React from "react";
import { useTranslation } from "react-i18next";

const Pagination = () => {
    const { t } = useTranslation();

    return (
        <div className="mb-5 hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-gray-700">
                    {t("STAFF.list.table.label.entryInformation", {
                        totalEntry: 10,
                        rangeStart: 1,
                        rangeEnd: 5,
                    })}
                </p>
            </div>
            <div className="join">
                <button className="join-item btn btn-sm btn-soft">1</button>
                <button className="join-item btn btn-sm btn-soft btn-active">
                    2
                </button>
                <button className="join-item btn btn-sm btn-soft">3</button>
                <button className="join-item btn btn-sm btn-soft">4</button>
            </div>
        </div>
    );
};

export default Pagination;
