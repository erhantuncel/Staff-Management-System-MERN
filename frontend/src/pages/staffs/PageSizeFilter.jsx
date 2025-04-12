import React from "react";
import Select from "../../components/form/Select";
import { useTranslation } from "react-i18next";

const PageSizeFilter = () => {
    const { t } = useTranslation();

    const pageSizeOptions = [
        { key: "1", value: 5 },
        { key: "2", value: 10 },
        { key: "3", value: 15 },
    ];

    return (
        <>
            <span className="content-center">
                {t("STAFF.list.table.label.entryCount1")}
            </span>
            <Select
                defaultValue="5"
                className="select select-sm w-15 flex-none"
                options={pageSizeOptions}
            />
            <span className="content-center">
                {t("STAFF.list.table.label.entryCount2")}
            </span>
        </>
    );
};

export default PageSizeFilter;
