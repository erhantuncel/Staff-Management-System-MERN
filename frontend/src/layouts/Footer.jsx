import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t, i18n } = useTranslation();
    return (
        <footer className="footer footer-horizontal items-center bg-gray-100 p-4 text-gray-800">
            <aside className="grid-flow-col items-center"></aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a
                    className={i18n.language === "tr" ? "" : "link"}
                    onClick={() => i18n.changeLanguage("tr")}
                >
                    {t("TEMPLATE.FOOTER.link.turkish")}
                </a>
                |
                <a
                    className={i18n.language === "en" ? "" : "link"}
                    onClick={() => i18n.changeLanguage("en")}
                >
                    {t("TEMPLATE.FOOTER.link.english")}
                </a>
            </nav>
        </footer>
    );
};

export default Footer;
