import React from "react";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import { useTranslation } from "react-i18next";

const StaffDetailsForm = ({ staffInfo, modalState, register, errors }) => {
    const { t } = useTranslation();

    const departments = [
        { key: "1", value: "R&D" },
        { key: "2", value: "Finance" },
        { key: "3", value: "Stock" },
    ];

    const editableFields = ["phone", "email", "department"];

    return (
        <form noValidate>
            {staffInfo &&
                Object.entries(staffInfo).map(([key, value], index) => {
                    return (
                        <div className="mb-2 flex flex-row" key={index}>
                            <span className="basis-3/7 content-center text-sm font-bold">
                                {t(`STAFF.ADDUPDATEDETAILMODAL.label.${key}`)}
                            </span>
                            <div className="basis-5/7">
                                <span hidden={modalState.type !== "details"}>
                                    {value}
                                </span>
                                {key === "department" ? (
                                    <Select
                                        defaultValue={t(
                                            "STAFF.ADDUPDATEDETAILMODAL.label.department.defaultValue",
                                        )}
                                        className={"select-sm"}
                                        hidden={modalState.type === "details"}
                                        options={departments}
                                        {...register(`${key}`)}
                                    />
                                ) : (
                                    <Input
                                        type="text"
                                        className={"input input-sm"}
                                        hidden={modalState.type === "details"}
                                        readOnly={
                                            modalState.type === "update" &&
                                            editableFields.indexOf(key) === -1
                                        }
                                        error={errors && errors[key]?.message}
                                        {...register(`${key}`)}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
        </form>
    );
};

export default StaffDetailsForm;
