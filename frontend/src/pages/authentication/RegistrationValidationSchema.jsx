import * as yup from "yup";

const getRegistrationValidations = () => {
    return yup.object().shape({
        userName: yup
            .string()
            .required("User name is required.")
            .max(40, "Must be maximum 40 characters"),
        password: yup
            .string()
            .required("Password is required.")
            .min(8, "Must be minimum 8 characters"),
        passwordToConfirm: yup
            .string()
            .required("Confirm password is required.")
            .oneOf([yup.ref("password"), null], "Confirm password must match."),
    });
};

export default getRegistrationValidations;
