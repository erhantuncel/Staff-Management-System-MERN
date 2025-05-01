import React, { useEffect, useRef } from "react";

const getChildrenOnDisplayName = (children, displayName) => {
    return React.Children.map(children, (child) =>
        child.type.displayName === displayName ? child : null,
    );
};

const Modal = ({
    isOpen,
    onClose,
    modalBoxClassName,
    // formSubmitAction,
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

    const title = getChildrenOnDisplayName(children, "Title");
    const body = getChildrenOnDisplayName(children, "Body");
    const actions = getChildrenOnDisplayName(children, "Actions");

    return (
        <dialog className="modal" ref={modalRef} onKeyDown={handleKeyDown}>
            <div className={`modal-box ${modalBoxClassName}`}>
                {/* <form onSubmit={formSubmitAction}>
                    {title}
                    {body}
                    {actions}
                </form> */}
                {title}
                {body}
                {actions}
            </div>
        </dialog>
    );
};

const Title = ({ children, className, ...other }) => (
    <h3 className={`text-lg font-bold ${className}`} {...other}>
        {children}
    </h3>
);
Title.displayName = "Title";
Modal.Title = Title;

const Body = ({ children, className, ...other }) => (
    <div className={`py-4 ${className}`} {...other}>
        {children}
    </div>
);
Body.displayName = "Body";
Modal.Body = Body;

const Actions = ({ children, className, ...other }) => (
    <div className={`modal-action ${className}`} {...other}>
        {children}
    </div>
);
Actions.displayName = "Actions";
Modal.Actions = Actions;

export default Modal;
