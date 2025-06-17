import * as yup from "yup";

const getLoginValidations = () => {
    return yup.object().shape({
        userName: yup
            .string()
            .required("User name is required.")
            .max(40, "Must be maximum 40 characters"),
        password: yup
            .string()
            .required("Password is required.")
            .min(8, "Must be minimum 8 characters"),
    });
};

export default getLoginValidations;
