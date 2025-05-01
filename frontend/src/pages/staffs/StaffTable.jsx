import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../../components/ConfirmationModal";
import Button from "../../components/form/Button";
import TrashIcon from "../../components/icons/TrashIcon";
import DocumentMagnifyingGlassIcon from "../../components/icons/DocumentMagnifyingGlassIcon";

const StaffTable = ({ staffsData, handleOpenModal }) => {
    const { t } = useTranslation();

    const [selectedStaff, setSelectedStaff] = useState(null);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
        useState(false);
    const [confirmationModalMessage, setConfirmationModalMessage] =
        useState(null);

    const showDeleteConfirmationModal = (staff) => {
        setSelectedStaff(staff);
        setConfirmationModalMessage(
            t("DELETECONFIRMATIONMODAL.warningMessage", {
                staffId: staff.id,
                firstName: staff.firstName,
                lastName: staff.lastName,
            }),
        );
        setIsConfirmationModalOpen(true);
    };

    const handleDeleteConfirmationAccept = () => {
        console.log(`Staff has id: ${selectedStaff?.id} is deleted.`);
        setIsConfirmationModalOpen(false);
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
                    {staffsData.map((staff) => (
                        <tr key={staff.id}>
                            <th>{staff.id}</th>
                            <td>{staff.firstName}</td>
                            <td>{staff.lastName}</td>
                            <td>{staff.department}</td>
                            <td>{staff.createDate}</td>
                            <td className="text-right">
                                <Button
                                    className="btn btn-sm btn-soft mr-1"
                                    onClick={() =>
                                        handleOpenModal("details", staff)
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
                                    onClick={() =>
                                        showDeleteConfirmationModal(staff)
                                    }
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
                isOpen={isConfirmationModalOpen}
                message={confirmationModalMessage}
                title={t("DELETECONFIRMATIONMODAL.header.title")}
                acceptButtonLabel={t(
                    "DELETECONFIRMATIONMODAL.acceptButton.label",
                )}
                cancelButtonLabel={t(
                    "DELETECONFIRMATIONMODAL.cancelButton.label",
                )}
                onClose={() => setIsConfirmationModalOpen(false)}
                onAccept={() => handleDeleteConfirmationAccept()}
            />
        </div>
    );
};

export default StaffTable;
