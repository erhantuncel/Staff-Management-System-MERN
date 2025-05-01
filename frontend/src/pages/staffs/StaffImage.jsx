import React, { useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/form/Button";
import PlusCircleIcon from "../../components/icons/PlusCircleIcon";
import TrashIcon from "../../components/icons/TrashIcon";

const StaffImage = ({
    modalState,
    setValue,
    image,
    setImage,
    error,
    register,
}) => {
    const { t } = useTranslation();
    const { ref, ...fields } = register("image");
    const fileInputRef = useRef(null);

    const handleImageInputClick = () => {
        fileInputRef.current.click();
    };

    const handleInputFileOnchange = (event) => {
        const imageFile = event.target.files[0];
        setImage(imageFile);
        setValue("image", imageFile);
    };

    const handleRemoveClick = () => {
        setImage(null);
    };

    return (
        <>
            <div className="avatar">
                <div className="w-48 rounded">
                    {image ? (
                        <img src={URL.createObjectURL(image)} />
                    ) : (
                        <img src="../../../assets/img/no_profile_photo.jpg" />
                    )}
                </div>
            </div>
            {modalState.type !== "details" && (
                <div className="mt-1 flex flex-row justify-center gap-1">
                    <Button
                        className="btn btn-ghost btn-xs"
                        onClick={handleImageInputClick}
                    >
                        <PlusCircleIcon type="micro" />
                        {t("STAFF.ADDUPDATEDETAILMODAL.button.image.select")}
                    </Button>
                    <Button
                        className="btn btn-ghost btn-xs"
                        onClick={handleRemoveClick}
                    >
                        <TrashIcon type="micro" />
                        {t("STAFF.ADDUPDATEDETAILMODAL.button.image.remove")}
                    </Button>
                </div>
            )}
            {error && (
                <div className="mt-1 flex flex-row justify-start">
                    <span className="validator-hint text-error">{error}</span>
                </div>
            )}
            <input
                {...fields}
                ref={(instance) => {
                    ref(instance);
                    fileInputRef.current = instance;
                }}
                onChange={(event) => handleInputFileOnchange(event)}
                hidden
                type="file"
            />
        </>
    );
};

export default StaffImage;
