import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ConfirmationModal from "../../components/ConfirmationModal";
import { UIContext, UIContextProvider } from "../../contexts/UIContext";

describe("ConfirmationModal test", () => {
    vi.mock("react-i18next", async (importOriginal) => {
        const actual = await importOriginal();
        return {
            ...actual,
            Trans: ({ i18nKey }) => i18nKey,
            useTranslation: () => ({
                t: (key) => key,
            }),
        };
    });

    const isConfirmationModalOpen = true;
    const hideConfirmationModal = vi.fn();
    const mockOnAccept = vi.fn();

    beforeEach(() => {
        const modalRoot = document.createElement("div");
        modalRoot.setAttribute("id", "modal");
        document.body.appendChild(modalRoot);

        HTMLDialogElement.prototype.showModal = vi.fn();
        HTMLDialogElement.prototype.close = vi.fn();
    });

    afterEach(() => {
        const modalRoot = document.getElementById("modal");
        if (modalRoot) {
            document.body.removeChild(modalRoot);
        }

        delete HTMLDialogElement.prototype.showModal;
        delete HTMLDialogElement.prototype.close;
    });

    it("should render title", () => {
        render(
            <UIContextProvider>
                <ConfirmationModal title="Confirmation Title" />
            </UIContextProvider>,
        );

        expect(screen.getByText("Confirmation Title")).toBeInTheDocument();
    });

    it("should render translated message", () => {
        render(
            <UIContextProvider>
                <ConfirmationModal
                    title="Confirmation Title"
                    i18nKeyMessageKey="messageKey"
                    i18nMessageParams={{ param1: "param1" }}
                />
            </UIContextProvider>,
        );

        expect(screen.getByText("messageKey")).toBeInTheDocument();
    });

    it("should render accept and cancel button", () => {
        render(
            <UIContextProvider>
                <ConfirmationModal
                    title="Confirmation Title"
                    acceptButtonLabel="Accept"
                    cancelButtonLabel="Cancel"
                    i18nKeyMessageKey="messageKey"
                    i18nMessageParams={{ param1: "param1" }}
                />
            </UIContextProvider>,
        );

        const acceptButton = screen.getByRole("button", {
            hidden: true,
            name: "Accept",
        });
        const cancelButton = screen.getByRole("button", {
            hidden: true,
            name: "Cancel",
        });

        expect(acceptButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });

    it("should run handleAccept method when click accept button", () => {
        render(
            <UIContext.Provider
                value={(isConfirmationModalOpen, hideConfirmationModal)}
            >
                <ConfirmationModal
                    title="Confirmation Title"
                    acceptButtonLabel="Accept"
                    onAccept={mockOnAccept}
                    i18nKeyMessageKey="messageKey"
                    i18nMessageParams={{ param1: "param1" }}
                />
            </UIContext.Provider>,
        );

        const acceptButton = screen.getByRole("button", {
            hidden: true,
            name: "Accept",
        });
        fireEvent.click(acceptButton);

        expect(mockOnAccept).toHaveBeenCalled();
    });

    it("should run handleCancel method when click cancel button", () => {
        render(
            <UIContext.Provider
                value={{
                    isConfirmationModalOpen,
                    hideConfirmationModal,
                }}
            >
                <ConfirmationModal
                    title="Confirmation Title"
                    cancelButtonLabel="Cancel"
                    i18nKeyMessageKey="messageKey"
                    i18nMessageParams={{ param1: "param1" }}
                />
            </UIContext.Provider>,
        );
        const cancelButton = screen.getByRole("button", {
            hidden: true,
            name: "Cancel",
        });
        fireEvent.click(cancelButton);
        expect(hideConfirmationModal).toHaveBeenCalled();
    });
});
