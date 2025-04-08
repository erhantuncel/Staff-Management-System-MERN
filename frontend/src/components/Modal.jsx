import React, { useEffect, useRef } from "react";
import Button from "./form/Button";

const Modal = ({
    isOpen,
    onClose,
    title,
    modalBoxClassName,
    formSubmitAction,
    children,
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

    const handleCloseModal = (event) => {
        event.preventDefault();
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
                <form onSubmit={formSubmitAction}>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <div className="py-4">{children}</div>
                    <div className="modal-action">
                        {formSubmitAction && (
                            <Button
                                className="btn btn-sm btn-neutral"
                                type="submit"
                            >
                                Save
                            </Button>
                        )}
                        <Button
                            className="btn btn-sm btn-error"
                            onClick={handleCloseModal}
                        >
                            Close
                        </Button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default Modal;
