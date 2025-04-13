import React from "react";
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(StaffValidationSchema),
    });

    const onSubmit = (data) => {
        console.log("On Submit");
        console.log(data);
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
                <div className="flex flex-row">
                    <div className="basis-64 pr-10 text-center">
                        <StaffImage modalState={modalState} />
                    </div>
                    <div className="basis-128">
                        <StaffDetailsForm
                            staffInfo={staffInfo}
                            modalState={modalState}
                            register={register}
                            errors={errors}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Actions>
                <Button
                    className={
                        "btn btn-sm btn-neutral " +
                        (modalState.type !== "add" ? "hidden" : "")
                    }
                    onClick={handleSubmit(onSubmit)}
                >
                    {t("STAFF.ADDUPDATEDETAILMODAL.button.accept.add")}
                </Button>
                <Button
                    className={
                        "btn btn-sm btn-neutral " +
                        (modalState.type !== "update" ? "hidden" : "")
                    }
                    onClick={handleSubmit(onSubmit)}
                >
                    {t("STAFF.ADDUPDATEDETAILMODAL.button.accept.update")}
                </Button>
                <Button
                    className={
                        "btn btn-sm btn-neutral " +
                        (modalState.type !== "details" ? "hidden" : "")
                    }
                    onClick={() =>
                        changeModalState({ ...modalState, type: "update" })
                    }
                >
                    {t("STAFF.ADDUPDATEDETAILMODAL.button.update")}
                </Button>
                <Button className="btn btn-sm btn-soft" onClick={onClose}>
                    {modalState.type === "details"
                        ? t("STAFF.ADDUPDATEDETAILMODAL.button.close")
                        : t("STAFF.ADDUPDATEDETAILMODAL.button.cancel")}
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default StaffAddUpdateDetailModal;
