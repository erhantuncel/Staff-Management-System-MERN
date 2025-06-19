import { useTranslation } from "react-i18next";
import * as yup from "yup";

const getLoginValidations = () => {
    const { t } = useTranslation();

    return yup.object().shape({
        userName: yup
            .string()
            .required(t("LOGIN.invalid.message.userName.required"))
            .max(
                40,
                t("LOGIN.invalid.message.userName.maxLenght", { maxChar: 40 }),
            ),
        password: yup
            .string()
            .required(t("LOGIN.invalid.message.password.required"))
            .min(
                8,
                t("LOGIN.invalid.message.password.minLenght", { minChar: 8 }),
            ),
    });
};

export default getLoginValidations;
