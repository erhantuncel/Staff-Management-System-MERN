import React from "react";
import Input from "../../components/form/Input";
import ControllerSelect from "../../components/form/ControllerSelect";
import { useTranslation } from "react-i18next";

const StaffDetailsForm = ({
    staffInfo,
    modalState,
    register,
    control,
    errors,
}) => {
    const { t } = useTranslation();

    const departments = Array.from({ length: 26 }, (val, i) => ({
        value: `Department${i}`,
        label: `Department${i}`,
    }));

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
                                    <ControllerSelect
                                        name={key}
                                        control={control}
                                        isHidden={modalState.type === "details"}
                                        options={departments}
                                        error={errors && errors[key]?.message}
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
