import { useContext, useEffect, useState } from "react";
import Select from "../../components/form/Select";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import MagnifyingGlassIcon from "../../components/icons/MagnifyingGlassIcon";
import ArrowPathIcon from "../../components/icons/ArrowPathIcon";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { StaffListContext } from "../../contexts/StaffListContext";
import { yupResolver } from "@hookform/resolvers/yup";
import getFilterValidation from "./FilterValidationSchema";

const ColumnFilter = () => {
    const { t } = useTranslation();

    const { searchFilters, setSearchFilters, departments } =
        useContext(StaffListContext);

    const controlsDefaultValues = {
        department: "",
        column: "",
        keyword: "",
    };

    const columnsForSelect = [
        {
            key: "1",
            label: t("STAFF.list.table.searchType.firstName"),
            value: "firstName",
        },
        {
            key: "2",
            label: t("STAFF.list.table.searchType.lastName"),
            value: "lastName",
        },
    ];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(getFilterValidation()),
    });

    const onSubmit = (data) => {
        console.log("On Submit");
        console.log(data);
        setSearchFilters({ ...searchFilters, ...data });
    };

    const handleReset = () => {
        reset({ ...controlsDefaultValues });
        setSearchFilters({ ...controlsDefaultValues });
    };

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-end gap-1">
                <Select
                    defaultOptionLabel={t("STAFF.select.department.label")}
                    defaultOptionValue=""
                    className="select select-sm"
                    options={departments}
                    {...register("department")}
                    error={errors && errors["department"]?.message}
                    showErrorMessage={false}
                />
                <Select
                    defaultOptionLabel={t("STAFF.select.column.label")}
                    defaultOptionValue=""
                    className="select select-sm"
                    options={columnsForSelect}
                    {...register("column")}
                    error={errors && errors["column"]?.message}
                    showErrorMessage={false}
                />
                <Input
                    type="text"
                    placeholder=""
                    className="input input-sm"
                    error={errors && errors["keyword"]?.message}
                    showErrorMessage={false}
                    {...register("keyword")}
                />
                <Button type="submit" className="btn btn-neutral btn-sm">
                    <MagnifyingGlassIcon type="micro" />
                    {t("STAFF.list.table.button.searchStaff")}
                </Button>
                <Button
                    type="button"
                    hidden={!searchFilters.keyword}
                    className="btn btn-neutral btn-sm"
                    onClick={handleReset}
                >
                    <ArrowPathIcon type="micro" />
                    {t("STAFF.list.table.button.resetFilters")}
                </Button>
            </div>
        </form>
    );
};

export default ColumnFilter;
