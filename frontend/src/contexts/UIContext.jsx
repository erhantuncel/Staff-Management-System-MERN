import React, { useState, createContext } from "react";

export const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
    const [modalToShow, setModalToShow] = useState("");
    const [isAddUpdateDetailsModalOpen, setIsAddUpdateDetailsModalOpen] =
        useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
        useState(false);

    const showAddModal = () => {
        setModalToShow("add");
        setIsAddUpdateDetailsModalOpen(true);
    };

    const showUpdateModal = () => {
        setModalToShow("update");
        setIsAddUpdateDetailsModalOpen(true);
    };

    const showDetailsModal = () => {
        setModalToShow("details");
        setIsAddUpdateDetailsModalOpen(true);
    };

    const showConfirmationModal = () => {
        setIsConfirmationModalOpen(true);
    };

    const hideAddUpdateDetailsModal = () => {
        setIsAddUpdateDetailsModalOpen(false);
    };

    const hideConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    const UImodalToShowContext = {
        modalToShow,
        isAddUpdateDetailsModalOpen,
        isConfirmationModalOpen,
        showAddModal,
        showUpdateModal,
        showDetailsModal,
        showConfirmationModal,
        hideAddUpdateDetailsModal,
        hideConfirmationModal,
    };

    return (
        <UIContext.Provider value={UImodalToShowContext}>
            {children}
        </UIContext.Provider>
    );
};
