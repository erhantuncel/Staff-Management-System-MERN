import React from "react";
import Select from "../../components/form/Select";
import { useTranslation } from "react-i18next";

const PageSizeFilter = ({ staffFilter, setStaffFilter }) => {
    const { t } = useTranslation();

    const pageSizeOptions = [
        { key: "1", value: 5 },
        { key: "2", value: 10 },
        { key: "3", value: 15 },
    ];

    const handleChange = (event) => {
        setStaffFilter({ ...staffFilter, pageSize: event.target.value });
    };

    return (
        <form>
            <div className="flex content-center gap-1 justify-self-start">
                <span className="content-center">
                    {t("STAFF.list.table.label.entryCount1")}
                </span>
                <Select
                    defaultValue="5"
                    className="select select-sm w-15 flex-none"
                    options={pageSizeOptions}
                    onChange={handleChange}
                />
                <span className="content-center">
                    {t("STAFF.list.table.label.entryCount2")}
                </span>
            </div>
        </form>
    );
};

export default PageSizeFilter;
