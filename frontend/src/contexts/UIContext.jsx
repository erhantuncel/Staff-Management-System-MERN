import { useState, createContext } from "react";

export const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
    const [modalToShow, setModalToShow] = useState("");

    const showAddModal = () => {
        setModalToShow("add");
    };

    const showUpdateModal = () => {
        setModalToShow("update");
    };

    const showDetailsModal = () => {
        setModalToShow("details");
    };

    const showDeleteModal = () => {
        setModalToShow("delete");
    };

    const hideModal = () => {
        setModalToShow("");
    };

    const UImodalToShowContext = {
        modalToShow,
        showAddModal,
        showUpdateModal,
        showDetailsModal,
        showDeleteModal,
        hideModal,
    };

    return (
        <UIContext.Provider value={UImodalToShowContext}>
            {children}
        </UIContext.Provider>
    );
};
