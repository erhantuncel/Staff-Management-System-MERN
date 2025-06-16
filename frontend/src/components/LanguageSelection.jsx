import { useTranslation } from "react-i18next";

const LanguageSelection = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
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
        </>
    );
};

export default LanguageSelection;
