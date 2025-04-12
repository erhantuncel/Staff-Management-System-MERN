import React from "react";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import { useTranslation } from "react-i18next";

const StaffDetailsForm = ({ staffInfo, modalState }) => {
    const { t } = useTranslation();

    const departments = [
        { key: "1", value: "R&D" },
        { key: "2", value: "Finance" },
        { key: "3", value: "Stock" },
    ];

    const editableFields = ["phone", "email", "department"];

    return (
        <>
            {staffInfo &&
                Object.entries(staffInfo).map(([key, value]) => {
                    return (
                        <div className="mb-2 flex flex-row">
                            <p className="basis-3/7 content-center text-sm font-bold">
                                {t(`STAFF.ADDUPDATEDETAILMODAL.label.${key}`)}
                            </p>
                            <p
                                className={
                                    "basis-5/7 " +
                                    (modalState.type !== "details"
                                        ? modalState.type === "update"
                                            ? editableFields.indexOf(key) !== -1
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
                                        "select-sm basis-5/7 " +
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
                                />
                            ) : (
                                <Input
                                    type="text"
                                    className={
                                        "input input-sm basis-5/7 " +
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
                                    value={value}
                                />
                            )}
                        </div>
                    );
                })}
        </>
    );
};

export default StaffDetailsForm;
