import React from "react";
import Modal from "../Modal";
import Button from "../form/Button";
import Input from "../form/Input";
import Select from "../form/Select";

const StaffAddUpdateDetailModal = ({ modalState, onClose, staffInfo }) => {
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

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={onClose}
            modalBoxClassName="w-10/12 max-w-2xl"
            formSubmitAction={onSubmit}
        >
            <Modal.Title>
                {modalState.type === "add"
                    ? "Add Staff"
                    : modalState.type === "update"
                      ? "Update Staff"
                      : "Staff Details"}
            </Modal.Title>
            <Modal.Body>
                <div className="flex flex-row">
                    <div className="basis-64 pr-10 text-center">
                        <div className="avatar">
                            <div className="w-48 rounded">
                                <img src="../../../assets/img/no_profile_photo.jpg" />
                            </div>
                        </div>
                        <Button className="btn btn-sm btn-link">
                            Add Image
                        </Button>
                    </div>
                    <div className="basis-128">
                        {modalState.type !== "add" &&
                            staffInfo &&
                            Object.entries(staffInfo).map(([key, value]) => {
                                return (
                                    <div className="mb-2 flex flex-row">
                                        <p className="basis-3/7 content-center text-sm font-bold">
                                            {key}
                                        </p>
                                        <p className={"hidden basis-5/7"}>
                                            {value}
                                        </p>
                                        {key === "department" ? (
                                            <Select
                                                defaultValue="Select Department"
                                                className="select-sm basis-5/7"
                                                options={departments}
                                            />
                                        ) : (
                                            <Input
                                                type="text"
                                                className="input input-sm basis-5/7"
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
                    Add
                </Button>
                <Button
                    className={
                        "btn btn-sm btn-neutral " +
                        (modalState.type !== "update" ? "hidden" : "")
                    }
                >
                    Update
                </Button>
                <Button
                    className={
                        "btn btn-sm btn-accent " +
                        (modalState.type !== "details" ? "hidden" : "")
                    }
                >
                    Edit
                </Button>
                <Button className="btn btn-sm btn-error" onClick={onClose}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default StaffAddUpdateDetailModal;
