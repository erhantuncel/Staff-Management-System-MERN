import React from "react";
import { useTranslation } from "react-i18next";

const StaffFilterBar = () => {
    const { t } = useTranslation();

    return (
        <div className="mb-2 grid grid-cols-2">
            <div className="flex content-center gap-1 justify-self-start">
                <span className="content-center">
                    {t("STAFF.list.table.label.entryCount1")}
                </span>
                <select
                    defaultValue="5"
                    className="select select-sm w-15 flex-none"
                >
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                </select>
                <span className="content-center">
                    {t("STAFF.list.table.label.entryCount2")}
                </span>
            </div>
            <div className="flex justify-end gap-1">
                <select
                    defaultValue="Departman Seçiniz"
                    className="select select-sm"
                >
                    <option disabled={true}>
                        {t("STAFF.select.department.label")}
                    </option>
                    <option>Üretim</option>
                    <option>Finans</option>
                    <option>Ar-Ge</option>
                </select>
                <select
                    defaultValue="Sütun Seçiniz"
                    className="select select-sm"
                >
                    <option disabled={true}>
                        {t("STAFF.select.column.label")}
                    </option>
                    <option>
                        {t("STAFF.list.table.searchType.firstName")}
                    </option>
                    <option>{t("STAFF.list.table.searchType.lastName")}</option>
                </select>
                <input type="text" placeholder="" className="input input-sm" />
                <button className="btn btn-neutral btn-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {t("STAFF.list.table.button.searchStaff")}
                </button>
            </div>
        </div>
    );
};

export default StaffFilterBar;
