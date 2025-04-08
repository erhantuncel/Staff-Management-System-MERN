import React from "react";
import Modal from "../Modal";
import Input from "../form/Input";
import Select from "../form/Select";

const StaffDetailModal = ({ isOpen, onClose, staffInfo }) => {
    const handleClose = () => {
        onClose();
    };

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
            isOpen={isOpen}
            onClose={handleClose}
            title="Staff Details"
            modalBoxClassName="w-10/12 max-w-2xl"
            formSubmitAction={onSubmit}
        >
            <div className="flex flex-row">
                <div className="basis-64 pr-10">
                    <div className="avatar">
                        <div className="w-48 rounded">
                            <img src="../../../assets/img/no_profile_photo.jpg" />
                        </div>
                    </div>
                </div>
                <div className="basis-128">
                    {staffInfo &&
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
        </Modal>
    );
};

export default StaffDetailModal;
