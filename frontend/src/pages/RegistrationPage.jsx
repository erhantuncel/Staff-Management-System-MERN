import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const RegistrationPage = () => {
    const { t, i18n } = useTranslation();
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="mb-10 text-4xl font-bold">
                        {t("REGISTRATION.hero.title")}
                    </h1>
                </div>
                <div className="card bg-base-100 w-full min-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <label className="font-bold">
                            {t("REGISTRATION.input.label.userName")}
                        </label>
                        <input type="text" className="input" />
                        <label className="font-bold">
                            {t("REGISTRATION.input.label.password")}
                        </label>
                        <input type="password" className="input" />
                        <label className="font-bold">
                            {t("REGISTRATION.input.label.passwordConfirm")}
                        </label>
                        <input type="password" className="input" />
                        <button className="btn btn-neutral mt-4">
                            {t("REGISTRATION.button.label")}
                        </button>
                    </div>
                </div>
                <div className="mt-10 flex justify-center gap-1 text-center text-sm">
                    {t("REGISTRATION.existing.account.message")}
                    <Link className="link link-neutral" to="/login">
                        {t("REGISTRATION.link.login")}
                    </Link>
                </div>
                <div className="mt-10 flex justify-center gap-1.5 text-center text-xs">
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
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
