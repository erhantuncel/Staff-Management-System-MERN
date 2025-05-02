import React, { useContext } from "react";
import Select from "../../components/form/Select";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import MagnifyingGlassIcon from "../../components/icons/MagnifyingGlassIcon";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { StaffListContext } from "../../contexts/StaffListContext";

const ColumnFilter = ({ staffFilter, setStaffFilter }) => {
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

    const formInitialValues = {
        department: t("STAFF.select.department.label"),
        column: t("STAFF.select.column.label"),
        keyword: "",
    };

    const { populateStaffListItems } = useContext(StaffListContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const onSubmit = (data) => {
        console.log("On Submit");
        console.log(data);
        setStaffFilter({ ...staffFilter, ...data });
        populateStaffListItems([]);
        reset(formInitialValues);
    };

    return (
        <form noValidate>
            <div className="flex justify-end gap-1">
                <Select
                    defaultValue={t("STAFF.select.department.label")}
                    className="select select-sm"
                    options={departments}
                    {...register("department")}
                    error={errors && errors["department"]?.message}
                />
                <Select
                    defaultValue={t("STAFF.select.column.label")}
                    className="select select-sm"
                    options={columnsForSelect}
                    {...register("column")}
                    error={errors && errors["column"]?.message}
                />
                <Input
                    type="text"
                    placeholder=""
                    className="input input-sm"
                    {...register("keyword")}
                    error={errors && errors["keyword"]?.message}
                />
                <Button
                    className="btn btn-neutral btn-sm"
                    onClick={handleSubmit(onSubmit)}
                >
                    <MagnifyingGlassIcon type="micro" />
                    {t("STAFF.list.table.button.searchStaff")}
                </Button>
            </div>
        </form>
    );
};

export default ColumnFilter;
