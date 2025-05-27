import { useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/form/Button";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import StaffImage from "./StaffImage";
import StaffDetailsForm from "./StaffDetailsForm";
import getStaffValidation from "./StaffValidationSchema";
import { UIContext } from "../../contexts/UIContext";
import { StaffListContext } from "../../contexts/StaffListContext";
import { toast } from "react-toastify";
import {
    createStaff,
    getAllStaffWithPagination,
    updateStaff,
} from "../../api/services/StaffService";

const StaffAddUpdateDetailModal = () => {
    const { t } = useTranslation();

    const { modalToShow, showUpdateModal, hideModal } = useContext(UIContext);
    const { selectedStaff, populateStaffListItems, pagination, setTotalCount } =
        useContext(StaffListContext);

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
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(getStaffValidation()),
    });

    const onSubmit = (data) => {
        console.log("On Submit");
        data = { ...data, department: data.department.value };

        let serviceResponse = null;
        switch (modalToShow) {
            case "add":
                serviceResponse = createStaff(data);
                break;
            case "update":
                serviceResponse = updateStaff(selectedStaff._id, data);
                break;
        }

        serviceResponse
            ?.then((response) => {
                if (
                    (response.statusCode === modalToShow) === "add" ? 201 : 200
                ) {
                    toast.success(getMessageForToastify(data, "success"));
                } else {
                    toast.error(getMessageForToastify(data, "error"));
                }
            })
            .catch((error) => {
                toast.error(getMessageForToastify(data, "error"));
            })
            .finally(() => {
                setImage(null);
                hideModal();
                getAllStaffWithPagination(
                    pagination.page,
                    pagination.pageSize,
                ).then((response) => {
                    populateStaffListItems(response.data);
                    setTotalCount(response.metadata.totalCount);
                });
            });
    };

    const handleClose = () => {
        setImage(null);
        hideModal();
    };

    const getMessageForToastify = (staff, status) => {
        let toastifyMessage = "";
        if (modalToShow === "add") {
            toastifyMessage = t(
                `STAFF.ADDUPDATEDETAILMODAL.toastify.addStaff.${status}.message`,
                { firstName: staff.firstName, lastName: staff.lastName },
            );
        } else if (modalToShow === "update") {
            toastifyMessage = t(
                `STAFF.ADDUPDATEDETAILMODAL.toastify.updateStaff.${status}.message`,
                { firstName: staff.firstName, lastName: staff.lastName },
            );
        }
        return toastifyMessage;
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
