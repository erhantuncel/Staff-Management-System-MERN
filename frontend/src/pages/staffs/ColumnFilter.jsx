import React from "react";
import Select from "../../components/form/Select";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import MagnifyingGlassIcon from "../../components/icons/MagnifyingGlassIcon";
import { useTranslation } from "react-i18next";

const ColumnFilter = () => {
    const { t } = useTranslation();

    const departments = [
        { key: "1", value: "R&D" },
        { key: "2", value: "Finance" },
        { key: "3", value: "Stock" },
    ];

    const columnsForSelect = [
        { key: "1", value: t("STAFF.list.table.searchType.firstName") },
        { key: "2", value: t("STAFF.list.table.searchType.lastName") },
    ];

    return (
        <>
            <Select
                defaultValue="Departman Seçiniz"
                className="select select-sm"
                options={departments}
            />
            <Select
                defaultValue={t("STAFF.select.column.label")}
                className="select select-sm"
                options={columnsForSelect}
            />
            <Input type="text" placeholder="" className="input input-sm" />
            <Button className="btn btn-neutral btn-sm">
                <MagnifyingGlassIcon type="micro" />
                {t("STAFF.list.table.button.searchStaff")}
            </Button>
        </>
    );
};

export default ColumnFilter;
