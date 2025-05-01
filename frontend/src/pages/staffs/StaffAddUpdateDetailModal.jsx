import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/form/Button";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import StaffImage from "./StaffImage";
import StaffDetailsForm from "./StaffDetailsForm";
import StaffValidationSchema from "./StaffValidationSchema";

const StaffAddUpdateDetailModal = ({
    modalState,
    changeModalState,
    onClose,
    staffInfo,
}) => {
    const { t } = useTranslation();

    const [image, setImage] = useState(null);

    useEffect(() => {
        staffInfo &&
            Object.keys(staffInfo).forEach((key) => {
                if (key === "department" && staffInfo[key]) {
                    setValue(key, {
                        value: staffInfo[key],
                        label: staffInfo[key],
                    });
                } else {
                    setValue(key, staffInfo[key]);
                }
            });
        staffInfo && setImage(staffInfo.image);
    }, [staffInfo]);

    const {
        control,
        register,
        setValue,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(StaffValidationSchema),
    });

    const onSubmit = (data) => {
        console.log("On Submit");
        data["createDate"] = new Date();
        console.log(data);
        setImage(null);
        onClose();
    };

    const handleClose = () => {
        reset();
        setImage(null);
        onClose();
    };

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={onClose}
            modalBoxClassName="w-10/12 max-w-2xl"
        >
            <Modal.Title>
                {modalState.type === "add"
                    ? t("STAFF.ADDUPDATEDETAILMODAL.title.add")
                    : modalState.type === "update"
                      ? t("STAFF.ADDUPDATEDETAILMODAL.title.update")
                      : t("STAFF.ADDUPDATEDETAILMODAL.title.detail")}
            </Modal.Title>
            <Modal.Body>
                <form noValidate>
                    <div className="flex flex-row">
                        <div className="basis-64 pr-10 text-center">
                            <StaffImage
                                modalState={modalState}
                                image={image}
                                setImage={setImage}
                                register={register}
                                setValue={setValue}
                                error={errors && errors["image"]?.message}
                            />
                        </div>
                        <div className="basis-128">
                            <StaffDetailsForm
                                staffInfo={staffInfo}
                                modalState={modalState}
                                register={register}
                                errors={errors}
                                control={control}
                            />
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Actions>
                <Button
                    className={"btn btn-sm btn-neutral"}
                    hidden={modalState.type !== "add"}
                    onClick={handleSubmit(onSubmit)}
                >
                    {t("STAFF.ADDUPDATEDETAILMODAL.button.accept.add")}
                </Button>
                <Button
                    className={"btn btn-sm btn-neutral"}
                    hidden={modalState.type !== "update"}
                    onClick={handleSubmit(onSubmit)}
                >
                    {t("STAFF.ADDUPDATEDETAILMODAL.button.accept.update")}
                </Button>
                <Button
                    className={"btn btn-sm btn-neutral"}
                    hidden={modalState.type !== "details"}
                    onClick={() =>
                        changeModalState({ ...modalState, type: "update" })
                    }
                >
                    {t("STAFF.ADDUPDATEDETAILMODAL.button.update")}
                </Button>
                <Button className="btn btn-sm btn-soft" onClick={handleClose}>
                    {modalState.type === "details"
                        ? t("STAFF.ADDUPDATEDETAILMODAL.button.close")
                        : t("STAFF.ADDUPDATEDETAILMODAL.button.cancel")}
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default StaffAddUpdateDetailModal;
