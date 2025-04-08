import React, { useEffect, useRef } from "react";
import Button from "./form/Button";

const ConfirmationModal = ({
    isOpen,
    onAccept,
    onClose,
    cancelButtonLabel,
    acceptButtonLabel,
    title,
    modalBoxClassName,
    message,
}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const modalElement = modalRef.current;
        if (!modalElement) return;

        if (isOpen) {
            modalElement.showModal();
        } else {
            modalElement.close();
        }
    }, [isOpen]);

    const handleAccept = () => {
        console.log("Confirmation Modal Accepted");
        if (onAccept) {
            onAccept();
        }
    };

    const handleCancel = () => {
        console.log("Confirmation Modal Cancelled");
        if (onClose) {
            onClose();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };

    return (
        <dialog className="modal" ref={modalRef} onKeyDown={handleKeyDown}>
            <div className={`modal-box ${modalBoxClassName}`}>
                <h3 className="text-lg font-bold">{title}</h3>
                <div className="py-4">{message}</div>
                <div className="modal-action">
                    <Button
                        className="btn btn-sm btn-error"
                        onClick={handleAccept}
                    >
                        {acceptButtonLabel}
                    </Button>
                    <Button className="btn btn-sm" onClick={handleCancel}>
                        {cancelButtonLabel}
                    </Button>
                </div>
            </div>
        </dialog>
    );
};

export default ConfirmationModal;
