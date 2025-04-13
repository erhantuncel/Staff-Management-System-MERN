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
                            <p className="basis-3/7 content-center text-sm font-bold">
                                {t(`STAFF.ADDUPDATEDETAILMODAL.label.${key}`)}
                            </p>
                            <div className="basis-5/7">
                                <p
                                    className={
                                        "basis-5/7 " +
                                        (modalState.type !== "details"
                                            ? modalState.type === "update"
                                                ? editableFields.indexOf(
                                                      key,
                                                  ) !== -1
                                                    ? "hidden"
                                                    : ""
                                                : "hidden"
                                            : "")
                                    }
                                >
                                    {value}
                                </p>
                                {key === "department" ? (
                                    <Select
                                        defaultValue={t(
                                            "STAFF.ADDUPDATEDETAILMODAL.label.department.defaultValue",
                                        )}
                                        className={
                                            "select-sm " +
                                            (modalState.type !== "details"
                                                ? modalState.type === "update"
                                                    ? editableFields.indexOf(
                                                          key,
                                                      ) !== -1
                                                        ? ""
                                                        : "hidden"
                                                    : ""
                                                : "hidden")
                                        }
                                        options={departments}
                                        {...register(`${key}`)}
                                    />
                                ) : (
                                    <Input
                                        type="text"
                                        className={
                                            "input input-sm " +
                                            (modalState.type !== "details"
                                                ? modalState.type === "update"
                                                    ? editableFields.indexOf(
                                                          key,
                                                      ) !== -1
                                                        ? ""
                                                        : "hidden"
                                                    : ""
                                                : "hidden")
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
