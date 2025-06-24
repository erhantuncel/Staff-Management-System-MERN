import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import LanguageSelection from "../../components/LanguageSelection";
import { useForm } from "react-hook-form";
import Input from "../../components/form/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import getLoginValidations from "./LoginValidationSchema";
import { loginUser } from "../../api/services/AuthenticationService";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { useContext } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setUser, setToken } = useContext(AuthenticationContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(getLoginValidations()),
    });

    const onSubmit = (data) => {
        loginUser(data)
            .then((response) => {
                if (response.status === "success") {
                    const { token, ...user } = response.data;
                    setUser(user);
                    setToken(token);
                    localStorage.setItem("jwtToken", token);
                    navigate("/user");
                    return;
                }
            })
            .catch((error) => {
                toast.error("Login failed.");
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="mb-15 text-4xl font-bold">
                        {t("LOGIN.hero.title")}
                    </h1>
                </div>
                <div className="card bg-base-100 w-full min-w-sm shrink-0 shadow-2xl">
                    <form noValidate>
                        <div className="card-body">
                            <label className="font-bold">
                                {t("LOGIN.input.label.userName")}
                            </label>
                            <Input
                                type="text"
                                className={"input"}
                                error={errors && errors["userName"]?.message}
                                {...register("userName")}
                            />
                            <label className="font-bold">
                                {t("LOGIN.input.label.password")}
                            </label>
                            <Input
                                type="password"
                                className={"input"}
                                error={errors && errors["password"]?.message}
                                {...register("password")}
                            />
                            <button
                                className="btn btn-neutral mt-4"
                                onClick={handleSubmit(onSubmit)}
                            >
                                {t("LOGIN.button.label")}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-10 flex justify-center gap-1 text-center text-sm">
                    {t("LOGIN.not.exist.account.message")}
                    <Link className="link link-neutral" to="/register">
                        {t("LOGIN.link.register")}
                    </Link>
                </div>
                <div className="mt-5 flex justify-center gap-1.5 text-center text-xs">
                    <LanguageSelection />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
