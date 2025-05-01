import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/form/Button";
import UserPlusIcon from "../../components/icons/UserPlusIcon";

const StaffActionBar = ({ handleOpenModal }) => {
    const { t } = useTranslation();

    return (
        <div className="mb-5 flex justify-start">
            <Button
                className="btn btn-sm btn-neutral"
                onClick={() => handleOpenModal("add")}
            >
                <UserPlusIcon type="micro" />
                {t("STAFF.button.addStaff")}
            </Button>
        </div>
    );
};

export default StaffActionBar;
