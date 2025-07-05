import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Pagination from "../../components/Pagination";
import { StaffListContext } from "../../contexts/StaffListContext";

describe("Pagination Test", () => {
    const pagination = {
        page: 1,
        pageSize: 5,
    };
    const setPagination = vi.fn();
    const totalCount = 30;

    it("should render buttons based on count calculated with pagination info", () => {
        render(
            <StaffListContext.Provider
                value={{ pagination, setPagination, totalCount }}
            >
                <Pagination />
            </StaffListContext.Provider>,
        );

        const buttonArray = screen.getAllByRole("button", { hidden: true });
        expect(buttonArray.length).toBe(6);
    });

    it("should run setPagination function when clicked first button", () => {
        render(
            <StaffListContext.Provider
                value={{ pagination, setPagination, totalCount }}
            >
                <Pagination />
            </StaffListContext.Provider>,
        );
        const firstButton = screen.getAllByRole("button", { hidden: true })[0];
        fireEvent.click(firstButton);

        expect(setPagination).toHaveBeenCalled();
        expect(setPagination).toHaveBeenCalledWith({ ...pagination, page: 1 });
    });
});
