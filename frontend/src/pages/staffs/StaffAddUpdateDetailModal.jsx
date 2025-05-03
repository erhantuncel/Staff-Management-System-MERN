import React, { useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/form/Button";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import StaffImage from "./StaffImage";
import StaffDetailsForm from "./StaffDetailsForm";
import StaffValidationSchema from "./StaffValidationSchema";
import { UIContext } from "../../contexts/UIContext";
import { StaffListContext } from "../../contexts/StaffListContext";

const StaffAddUpdateDetailModal = () => {
    const { t } = useTranslation();

    const { modalToShow, showUpdateModal, hideModal } = useContext(UIContext);
    const { selectedStaff } = useContext(StaffListContext);

    const [image, setImage] = useState(null);

    useEffect(() => {
        selectedStaff &&
            Object.keys(selectedStaff).forEach((key) => {
                if (key === "department" && selectedStaff[key]) {
                    setValue(key, {
                        value: selectedStaff[key],
                        label: selectedStaff[key],
                    });
                } else {
                    setValue(key, selectedStaff[key]);
                }
            });
        selectedStaff && setImage(selectedStaff.image);
    }, [selectedStaff]);

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
        hideModal();
    };

    const handleClose = () => {
        reset();
        setImage(null);
        hideModal();
    };

    return (
        <Modal
            isOpen={["add", "update", "details"].includes(modalToShow)}
            onClose={hideModal}
            modalBoxClassName="w-10/12 max-w-2xl"
        >
            <Modal.Title>
                {modalToShow === "add"
                    ? t("STAFF.ADDUPDATEDETAILMODAL.title.add")
                    : modalToShow === "update"
                      ? t("STAFF.ADDUPDATEDETAILMODAL.title.update")
                      : t("STAFF.ADDUPDATEDETAILMODAL.title.detail")}
            </Modal.Title>
            <Modal.Body>
                <form noValidate>
                    <div className="flex flex-row">
                        <div className="basis-64 pr-10 text-center">
                            <StaffImage
                                image={image}
                                setImage={setImage}
                                register={register}
                                setValue={setValue}
                                error={errors && errors["image"]?.message}
                            />
                        </div>
                        <div className="basis-128">
                            <StaffDetailsForm
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
                    hidden={modalToShow !== "add"}
                    onClick={handleSubmit(onSubmit)}
                >
                    {t("STAFF.ADDUPDATEDETAILMODAL.button.accept.add")}
                </Button>
                <Button
                    className={"btn btn-sm btn-neutral"}
                    hidden={modalToShow !== "update"}
                    onClick={handleSubmit(onSubmit)}
                >
                    {t("STAFF.ADDUPDATEDETAILMODAL.button.accept.update")}
                </Button>
                <Button
                    className={"btn btn-sm btn-neutral"}
                    hidden={modalToShow !== "details"}
                    onClick={showUpdateModal}
                >
                    {t("STAFF.ADDUPDATEDETAILMODAL.button.update")}
                </Button>
                <Button className="btn btn-sm btn-soft" onClick={handleClose}>
                    {modalToShow === "details"
                        ? t("STAFF.ADDUPDATEDETAILMODAL.button.close")
                        : t("STAFF.ADDUPDATEDETAILMODAL.button.cancel")}
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default StaffAddUpdateDetailModal;
