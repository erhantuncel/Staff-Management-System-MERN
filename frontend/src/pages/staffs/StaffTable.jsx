import { useContext } from "react";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../../components/ConfirmationModal";
import Button from "../../components/form/Button";
import TrashIcon from "../../components/icons/TrashIcon";
import DocumentMagnifyingGlassIcon from "../../components/icons/DocumentMagnifyingGlassIcon";
import { UIContext } from "../../contexts/UIContext";
import { StaffListContext } from "../../contexts/StaffListContext";
import { toast } from "react-toastify";
import { removeStaff } from "../../api/services/StaffService";
import TableHeadColumn from "./TableHeadColumn";

const StaffTable = () => {
    const { t, i18n } = useTranslation();

    const { showDetailsModal, showConfirmationModal, hideConfirmationModal } =
        useContext(UIContext);
    const { selectedStaff, selectStaff, items, pagination, setPagination } =
        useContext(StaffListContext);

    const handleDeleteConfirmationAccept = () => {
        console.log(`Staff has id: ${selectedStaff?._id} is deleted.`);
        removeStaff(selectedStaff._id)
            .then((response) => {
                if (response.statusCode === 200) {
                    toast.success(
                        t(
                            "DELETECONFIRMATIONMODAL.toastify.deleteDepartment.success.message",
                            {
                                firstName: selectedStaff?.firstName,
                                lastName: selectedStaff?.lastName,
                            },
                        ),
                    );
                }
                setPagination({ ...pagination, page: 1 });
            })
            .catch((error) => {
                console.error(error);
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
                hideConfirmationModal();
            });
    };

    const handleShowDetailsModal = (staff) => {
        selectStaff(staff);
        showDetailsModal();
    };

    const handleShowDeleteModal = (staff) => {
        selectStaff(staff);
        showConfirmationModal();
    };

    const calculateStartingNumber = () => {
        const page = parseInt(pagination.page);
        const pageSize = parseInt(pagination.pageSize);
        return page * pageSize - pageSize + 1;
    };

    const tableHeadColumns = [
        { title: "no", isSortable: false },
        { title: "firstName", isSortable: true },
        { title: "lastName", isSortable: true },
        { title: "department", isSortable: true },
        { title: "createdAt", isSortable: true },
    ];

    const getFormattedDate = (dateStr) => {
        const dateObj = new Date(dateStr);
        const formatter = new Intl.DateTimeFormat(i18n.language, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
        });
        return formatter.format(dateObj);
    };

    return (
        <div className="rounded-box border-base-content/5 mb-5 max-h-[calc(100vh-300px)] overflow-scroll border">
            <table className="table">
                <thead className="bg-base-300 text-base-content sticky top-0">
                    <tr>
                        {tableHeadColumns.map((column) => (
                            <th key={column.title}>
                                <TableHeadColumn
                                    title={t(
                                        `STAFF.list.table.title.${column.title}`,
                                    )}
                                    fieldName={column.title}
                                    isSortable={column.isSortable}
                                />
                            </th>
                        ))}
                        <th className="lg:w-1/4 xl:w-1/5">
                            {t("STAFF.list.table.title.actions")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((staff, index) => (
                        <tr key={staff._id}>
                            <th>{calculateStartingNumber() + index}</th>
                            <td>{staff.firstName}</td>
                            <td>{staff.lastName}</td>
                            <td>{staff.department}</td>
                            <td>{getFormattedDate(staff.createdAt)}</td>
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
                i18nKeyMessageKey="DELETECONFIRMATIONMODAL.warningMessage"
                i18nMessageParams={{
                    staffId: selectedStaff.id,
                    firstName: selectedStaff.firstName,
                    lastName: selectedStaff.lastName,
                }}
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
