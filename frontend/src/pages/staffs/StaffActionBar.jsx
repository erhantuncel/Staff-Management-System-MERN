import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/form/Button";
import UserPlusIcon from "../../components/icons/UserPlusIcon";
import { UIContext } from "../../contexts/UIContext";
import { StaffListContext } from "../../contexts/StaffListContext";

const StaffActionBar = () => {
    const { t } = useTranslation();

    const { showAddModal } = useContext(UIContext);
    const { selectStaff } = useContext(StaffListContext);

    const handleAddStaff = () => {
        const empyStaffInfoForNewStaff = {
            _id: null,
            firstName: null,
            lastName: null,
            phone: null,
            email: null,
            department: null,
            image: null,
        };
        selectStaff(empyStaffInfoForNewStaff);
        showAddModal();
    };

    return (
        <div className="mb-5 flex justify-start">
            <Button
                className="btn btn-sm btn-neutral"
                onClick={handleAddStaff}
                // onClick={() => handleOpenModal("add")}
            >
                <UserPlusIcon type="micro" />
                {t("STAFF.button.addStaff")}
            </Button>
        </div>
    );
};

export default StaffActionBar;
