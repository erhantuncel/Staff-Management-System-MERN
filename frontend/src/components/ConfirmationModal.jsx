import { useContext } from "react";
import Button from "./form/Button";
import Modal from "./Modal";
import { UIContext } from "../contexts/UIContext";

const ConfirmationModal = ({
    onAccept,
    cancelButtonLabel,
    acceptButtonLabel,
    title,
    message,
}) => {
    const { modalToShow, hideModal } = useContext(UIContext);

    const handleAccept = () => {
        console.log("Confirmation Modal Accepted");
        if (onAccept) {
            onAccept();
        }
    };

    const handleCancel = () => {
        console.log("Confirmation Modal Cancelled");
        hideModal();
    };

    return (
        <Modal
            isOpen={modalToShow === "delete"}
            onClose={hideModal}
            modalBoxClassName="w-10/12 max-w-md"
        >
            <Modal.Title>{title}</Modal.Title>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Actions>
                <Button
                    className="btn btn-sm btn-neutral"
                    onClick={handleAccept}
                >
                    {acceptButtonLabel}
                </Button>
                <Button className="btn btn-sm" onClick={handleCancel}>
                    {cancelButtonLabel}
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ConfirmationModal;
