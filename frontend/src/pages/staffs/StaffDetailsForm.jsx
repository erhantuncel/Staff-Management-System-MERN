import React, { useContext } from "react";
import Input from "../../components/form/Input";
import ControllerSelect from "../../components/form/ControllerSelect";
import { useTranslation } from "react-i18next";
import { UIContext } from "../../contexts/UIContext";
import { StaffListContext } from "../../contexts/StaffListContext";

const StaffDetailsForm = ({ register, control, errors }) => {
    const { t } = useTranslation();
    const { modalToShow } = useContext(UIContext);

    const departments = Array.from({ length: 26 }, (val, i) => ({
        value: `Department${i}`,
        label: `Department${i}`,
    }));

    const { selectedStaff } = useContext(StaffListContext);

    const editableFields = ["phone", "email", "department"];

    return (
        <>
            {Object.entries(selectedStaff).map(([key, value], index) => {
                return (
                    <div className="mb-2 flex flex-row" key={index}>
                        {key !== "image" && key !== "_id" && (
                            <span className="basis-3/7 content-center text-sm font-bold">
                                {t(`STAFF.ADDUPDATEDETAILMODAL.label.${key}`)}
                            </span>
                        )}
                        <div className="basis-5/7">
                            <span hidden={modalToShow !== "details"}>
                                {key !== "image" && key !== "_id" && value}
                            </span>
                            {key === "department" ? (
                                <ControllerSelect
                                    name={key}
                                    control={control}
                                    isHidden={modalToShow === "details"}
                                    options={departments}
                                    error={errors && errors[key]?.message}
                                />
                            ) : (
                                key !== "image" &&
                                key !== "_id" && (
                                    <Input
                                        type="text"
                                        className={"input input-sm"}
                                        hidden={modalToShow === "details"}
                                        readOnly={
                                            modalToShow === "update" &&
                                            editableFields.indexOf(key) === -1
                                        }
                                        error={errors && errors[key]?.message}
                                        {...register(`${key}`)}
                                    />
                                )
                            )}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default StaffDetailsForm;
