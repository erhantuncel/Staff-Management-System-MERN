import React from "react";
import Modal from "../Modal";
import Button from "../form/Button";
import Input from "../form/Input";
import Select from "../form/Select";
import { useTranslation } from "react-i18next";

const StaffAddUpdateDetailModal = ({
    modalState,
    changeModalState,
    onClose,
    staffInfo,
}) => {
    const { t } = useTranslation();

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("On Submit");
        onClose();
    };

    const departments = [
        { key: "1", value: "R&D" },
        { key: "2", value: "Finance" },
        { key: "3", value: "Stock" },
    ];

    const editableFields = ["phone", "email", "department"];

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={onClose}
            modalBoxClassName="w-10/12 max-w-2xl"
            formSubmitAction={onSubmit}
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
                        <div className="avatar">
                            <div className="w-48 rounded">
                                <img src="../../../assets/img/no_profile_photo.jpg" />
                            </div>
                        </div>
                        {modalState.type !== "details" ? (
                            <div className="mt-1 flex flex-row justify-center gap-1">
                                <Button className="btn btn-ghost btn-xs">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        class="size-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {t(
                                        "STAFF.ADDUPDATEDETAILMODAL.button.image.select",
                                    )}
                                </Button>
                                <Button className="btn btn-ghost btn-xs">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        class="size-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {t(
                                        "STAFF.ADDUPDATEDETAILMODAL.button.image.remove",
                                    )}
                                </Button>
                            </div>
                        ) : null}
                    </div>
                    <div className="basis-128">
                        {staffInfo &&
                            Object.entries(staffInfo).map(([key, value]) => {
                                return (
                                    <div className="mb-2 flex flex-row">
                                        <p className="basis-3/7 content-center text-sm font-bold">
                                            {t(
                                                `STAFF.ADDUPDATEDETAILMODAL.label.${key}`,
                                            )}
                                        </p>
                                        <p
                                            className={
                                                "basis-5/7 " +
                                                (modalState.type !== "details"
                                                    ? modalState.type ===
                                                      "update"
                                                        ? editableFields.indexOf(
                                                              key,
                                                          ) !== -1
                                                            ? "hidden"
                                                            : ""
                                                        : "hidden"
                                                    : "")
                                            }
                                        >
                                            {value}
                                        </p>
                                        {key === "department" ? (
                                            <Select
                                                defaultValue={t(
                                                    "STAFF.ADDUPDATEDETAILMODAL.label.department.defaultValue",
                                                )}
                                                className={
                                                    "select-sm basis-5/7 " +
                                                    (modalState.type !==
                                                    "details"
                                                        ? modalState.type ===
                                                          "update"
                                                            ? editableFields.indexOf(
                                                                  key,
                                                              ) !== -1
                                                                ? ""
                                                                : "hidden"
                                                            : ""
                                                        : "hidden")
                                                }
                                                options={departments}
                                            />
                                        ) : (
                                            <Input
                                                type="text"
                                                className={
                                                    "input input-sm basis-5/7 " +
                                                    (modalState.type !==
                                                    "details"
                                                        ? modalState.type ===
                                                          "update"
                                                            ? editableFields.indexOf(
                                                                  key,
                                                              ) !== -1
                                                                ? ""
                                                                : "hidden"
                                                            : ""
                                                        : "hidden")
                                                }
                                                value={value}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Actions>
                <Button
                    className={
                        "btn btn-sm btn-neutral " +
                        (modalState.type !== "add" ? "hidden" : "")
                    }
                >
                    {t("STAFF.ADDUPDATEDETAILMODAL.button.accept.add")}
                </Button>
                <Button
                    className={
                        "btn btn-sm btn-neutral " +
                        (modalState.type !== "update" ? "hidden" : "")
                    }
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
