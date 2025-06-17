import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import LanguageSelection from "../../components/LanguageSelection";

const RegistrationPage = () => {
    const { t } = useTranslation();
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="mb-15 text-4xl font-bold">
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
                <div className="mt-5 flex justify-center gap-1.5 text-center text-xs">
                    <LanguageSelection />
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
