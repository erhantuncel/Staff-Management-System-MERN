import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Modal from "../../components/Modal";

describe("Modal Test", () => {
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
            <Modal isOpen={true}>
                <Modal.Title>Modal Title</Modal.Title>
            </Modal>,
        );

        expect(screen.getByText("Modal Title")).toBeInTheDocument();
    });

    it("should render paragraph has text ModalBody in body", () => {
        render(
            <Modal isOpen={true}>
                <Modal.Body>
                    <p>ModalBody</p>
                </Modal.Body>
            </Modal>,
        );

        const paragraph = screen.getByRole("paragraph", { hidden: true });
        expect(screen.getByText("ModalBody")).toContainElement(paragraph);
    });

    it("should call showModal action of dialog ", () => {
        render(
            <Modal isOpen={true}>
                <Modal.Title>Modal Title</Modal.Title>
            </Modal>,
        );

        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });

    it("should call close action of dialog ", () => {
        render(
            <Modal isOpen={false}>
                <Modal.Title>Modal Title</Modal.Title>
            </Modal>,
        );

        expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
    });

    it("should render action button and call handleClose method.", () => {
        const handleClose = vi.fn();

        render(
            <Modal isOpen={true}>
                <Modal.Actions>
                    <button onClick={handleClose}>Close</button>
                </Modal.Actions>
            </Modal>,
        );

        const closeButton = screen.getByRole("button", { hidden: true });
        fireEvent.click(closeButton);

        expect(closeButton).toBeInTheDocument();
        expect(handleClose).toHaveBeenCalled();
    });

    it("should call onClose function with Escape keydown", () => {
        const mockOnClose = vi.fn();
        render(
            <Modal isOpen={true} onClose={mockOnClose}>
                <Modal.Title>Modal Title</Modal.Title>
            </Modal>,
        );

        const modal = screen.getByText("Modal Title");

        fireEvent.keyDown(modal, {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            charCode: 27,
        });

        expect(mockOnClose).toHaveBeenCalled();
    });
});
