import { useTranslation } from "react-i18next";
import * as yup from "yup";

const getRegistrationValidations = () => {
    const { t } = useTranslation();

    return yup.object().shape({
        userName: yup
            .string()
            .required(t("REGISTRATION.invalid.message.userName.required"))
            .max(
                40,
                t("REGISTRATION.invalid.message.userName.maxLenght", {
                    maxChar: 40,
                }),
            ),
        password: yup
            .string()
            .required(t("REGISTRATION.invalid.message.password.required"))
            .min(
                8,
                t("REGISTRATION.invalid.message.password.minLenght", {
                    minChar: 8,
                }),
            ),
        passwordToConfirm: yup
            .string()
            .required(
                t("REGISTRATION.invalid.message.passwordToConfirm.required"),
            )
            .oneOf(
                [yup.ref("password"), null],
                t("REGISTRATION.invalid.message.passwordToConfirm.notMatch"),
            ),
    });
};

export default getRegistrationValidations;
