import React from "react";
import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Alert from "../../components/Alert";
import "@testing-library/jest-dom/vitest";

it("shoul render alert message", () => {
    render(<Alert message={"Alert message"} />);
    expect(screen.getby);
    expect(screen.getByText("Alert message")).toBeInTheDocument();
});
