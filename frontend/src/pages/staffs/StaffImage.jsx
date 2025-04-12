import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/form/Button";
import PlusCircleIcon from "../../components/icons/PlusCircleIcon";
import TrashIcon from "../../components/icons/TrashIcon";

const StaffImage = ({ modalState }) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="avatar">
                <div className="w-48 rounded">
                    <img src="../../../assets/img/no_profile_photo.jpg" />
                </div>
            </div>
            {modalState.type !== "details" && (
                <div className="mt-1 flex flex-row justify-center gap-1">
                    <Button className="btn btn-ghost btn-xs">
                        <PlusCircleIcon type="micro" />
                        {t("STAFF.ADDUPDATEDETAILMODAL.button.image.select")}
                    </Button>
                    <Button className="btn btn-ghost btn-xs">
                        <TrashIcon type="micro" />
                        {t("STAFF.ADDUPDATEDETAILMODAL.button.image.remove")}
                    </Button>
                </div>
            )}
        </>
    );
};

export default StaffImage;
