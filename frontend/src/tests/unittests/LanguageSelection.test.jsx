import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import LanguageSelection from "../../components/LanguageSelection";

describe("LanguageSelection Test", () => {
    const mockChangeLanguage = vi.hoisted(() => vi.fn());

    vi.mock("react-i18next", async (importOriginal) => {
        const actual = await importOriginal();
        return {
            ...actual,
            useTranslation: () => {
                return {
                    t: (key) => {
                        const translations = {
                            "TEMPLATE.FOOTER.link.turkish": "Turkish",
                            "TEMPLATE.FOOTER.link.english": "English",
                        };

                        return translations[key] || key;
                    },
                    i18n: {
                        language: "en",
                        changeLanguage: mockChangeLanguage,
                    },
                };
            },
        };
    });

    it("should render anchor with classname link and labeled Turkish", () => {
        render(<LanguageSelection />);
        const linkToTurkish = screen.getByText("Turkish");
        expect(linkToTurkish).toBeInTheDocument();
    });

    it("should render anchor with classname link and labeled English", () => {
        render(<LanguageSelection />);
        const linkToEnglish = screen.getAllByText("English")[0];
        expect(linkToEnglish).toBeInTheDocument();
    });

    it("should change language to Turkish when Turkish link is clicked", () => {
        render(<LanguageSelection />);
        const linkToTurkish = screen.getAllByText("Turkish")[0];
        fireEvent.click(linkToTurkish);

        expect(mockChangeLanguage).toHaveBeenCalled();
        expect(mockChangeLanguage).toHaveBeenCalledWith("tr");
        expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
    });

    it("should change language to English when English link is clicked", () => {
        render(<LanguageSelection />);
        const linkToEnglish = screen.getAllByText("English")[0];
        fireEvent.click(linkToEnglish);

        expect(mockChangeLanguage).toHaveBeenCalled();
        expect(mockChangeLanguage).toHaveBeenCalledWith("en");
        expect(mockChangeLanguage).toHaveBeenCalledTimes(2);
    });
});
