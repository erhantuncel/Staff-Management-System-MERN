import { useContext, useEffect, useState } from "react";
import Select from "../../components/form/Select";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import MagnifyingGlassIcon from "../../components/icons/MagnifyingGlassIcon";
import ArrowPathIcon from "../../components/icons/ArrowPathIcon";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { StaffListContext } from "../../contexts/StaffListContext";
import { getDistinctDepartments } from "../../api/services/DepartmentService";
import { yupResolver } from "@hookform/resolvers/yup";
import getFilterValidation from "./FilterValidationSchema";

const ColumnFilter = () => {
    const { t } = useTranslation();

    const { searchFilters, setSearchFilters } = useContext(StaffListContext);

    const [departments, setDepartments] = useState([]);

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

    useEffect(() => {
        getDistinctDepartments().then((response) => {
            const departments = response.data;
            let departmentsArray = [];
            departments.map((department, index) => {
                departmentsArray.push({
                    key: index + 1,
                    label: department,
                    value: department,
                });
            });
            setDepartments(departmentsArray);
        });
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
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
        <form noValidate>
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
                    {...register("keyword")}
                    error={errors && errors["keyword"]?.message}
                    showErrorMessage={false}
                />
                <Button
                    className="btn btn-neutral btn-sm"
                    onClick={handleSubmit(onSubmit)}
                >
                    <MagnifyingGlassIcon type="micro" />
                    {t("STAFF.list.table.button.searchStaff")}
                </Button>
                <Button
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
