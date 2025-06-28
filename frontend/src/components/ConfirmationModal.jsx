import { useContext } from "react";
import Button from "./form/Button";
import Modal from "./Modal";
import { UIContext } from "../contexts/UIContext";
import { Trans } from "react-i18next";

const ConfirmationModal = ({
    onAccept,
    cancelButtonLabel,
    acceptButtonLabel,
    title,
    i18nKeyMessageKey,
    i18nMessageParams,
}) => {
    const { isConfirmationModalOpen, hideConfirmationModal } =
        useContext(UIContext);

    const handleAccept = () => {
        console.log("Confirmation Modal Accepted");
        if (onAccept) {
            onAccept();
        }
    };

    const handleCancel = () => {
        console.log("Confirmation Modal Cancelled");
        hideConfirmationModal();
    };

    return (
        <Modal
            isOpen={isConfirmationModalOpen}
            onClose={hideConfirmationModal}
            modalBoxClassName="w-10/12 max-w-md"
        >
            <Modal.Title>{title}</Modal.Title>
            {/* <Modal.Body>{message}</Modal.Body> */}
            <Modal.Body>
                <Trans
                    i18nKey={i18nKeyMessageKey}
                    values={{ ...i18nMessageParams }}
                    components={{ b: <strong /> }}
                />
            </Modal.Body>
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
