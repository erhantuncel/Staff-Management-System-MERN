import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../../components/ConfirmationModal";
import Button from "../../components/form/Button";
import TrashIcon from "../../components/icons/TrashIcon";
import DocumentMagnifyingGlassIcon from "../../components/icons/DocumentMagnifyingGlassIcon";
import { UIContext } from "../../contexts/UIContext";
import { StaffListContext } from "../../contexts/StaffListContext";
import { toast } from "react-toastify";
import { getAllStaffs, removeStaff } from "../../api/services/StaffService";

const StaffTable = () => {
    const { t } = useTranslation();

    const { showDetailsModal, showDeleteModal, hideModal } =
        useContext(UIContext);
    const { selectedStaff, selectStaff, items, populateStaffListItems } =
        useContext(StaffListContext);

    const [confirmationModalMessage, setConfirmationModalMessage] =
        useState(null);

    const handleDeleteConfirmationAccept = () => {
        console.log(`Staff has id: ${selectedStaff?._id} is deleted.`);
        removeStaff(selectedStaff._id)
            .then((response) => {
                console.log(response);
                toast.success(
                    t(
                        "DELETECONFIRMATIONMODAL.toastify.deleteDepartment.success.message",
                        {
                            firstName: selectedStaff?.firstName,
                            lastName: selectedStaff?.lastName,
                        },
                    ),
                );
            })
            .catch((error) => {
                toast.error(
                    t(
                        "DELETECONFIRMATIONMODAL.toastify.deleteDepartment.error.message",
                        {
                            firstName: selectedStaff?.firstName,
                            lastName: selectedStaff?.lastName,
                        },
                    ),
                );
            })
            .finally(() => {
                hideModal();
                getAllStaffs().then((response) =>
                    populateStaffListItems(response.data),
                );
            });
    };

    const handleShowDetailsModal = (staff) => {
        selectStaff(staff);
        showDetailsModal();
    };

    const handleShowDeleteModal = (staff) => {
        selectStaff(staff);
        setConfirmationModalMessage(
            t("DELETECONFIRMATIONMODAL.warningMessage", {
                staffId: staff.id,
                firstName: staff.firstName,
                lastName: staff.lastName,
            }),
        );
        showDeleteModal();
    };

    return (
        <div className="rounded-box border-base-content/5 mb-5 max-h-[calc(100vh-300px)] overflow-scroll border">
            <table className="table">
                <thead className="bg-base-300 text-base-content sticky top-0">
                    <tr>
                        <th>{t("STAFF.list.table.title.no")}</th>
                        <th>{t("STAFF.list.table.title.firstName")}</th>
                        <th>{t("STAFF.list.table.title.lastName")}</th>
                        <th>{t("STAFF.list.table.title.departmentName")}</th>
                        <th>{t("STAFF.list.table.title.registeredDate")}</th>
                        <th className="lg:w-1/4 xl:w-1/5">
                            {t("STAFF.list.table.title.actions")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((staff, index) => (
                        <tr key={staff._id}>
                            <th>{index + 1}</th>
                            <td>{staff.firstName}</td>
                            <td>{staff.lastName}</td>
                            <td>{staff.department}</td>
                            <td>{staff.createDate}</td>
                            <td className="text-right">
                                <Button
                                    className="btn btn-sm btn-soft mr-1"
                                    onClick={() =>
                                        handleShowDetailsModal(staff)
                                    }
                                >
                                    <DocumentMagnifyingGlassIcon type="micro" />
                                    <span className="hidden lg:flex">
                                        {t(
                                            "STAFF.list.table.row.button.detail",
                                        )}
                                    </span>
                                </Button>
                                <Button
                                    className="btn btn-sm btn-soft"
                                    onClick={() => handleShowDeleteModal(staff)}
                                >
                                    <TrashIcon type="micro" />
                                    <span className="hidden lg:flex">
                                        {t(
                                            "STAFF.list.table.row.button.delete",
                                        )}
                                    </span>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmationModal
                message={confirmationModalMessage}
                title={t("DELETECONFIRMATIONMODAL.header.title")}
                acceptButtonLabel={t(
                    "DELETECONFIRMATIONMODAL.acceptButton.label",
                )}
                cancelButtonLabel={t(
                    "DELETECONFIRMATIONMODAL.cancelButton.label",
                )}
                onAccept={() => handleDeleteConfirmationAccept()}
            />
        </div>
    );
};

export default StaffTable;
