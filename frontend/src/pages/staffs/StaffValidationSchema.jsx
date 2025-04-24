import * as yup from "yup";

const StaffValidationSchema = yup.object().shape({
    firstName: yup
        .string("First name must be string")
        .required("First name is required")
        .max(40, "First name must be maximum 40 characters."),
    lastName: yup
        .string("Last name must be string")
        .required("Last name is required")
        .max(40, "Last name must be maximum 40 characters."),
    phone: yup
        .string("Phone should be string")
        .required("Phone is required")
        .length(10, "Phone number should be 10 digits"),
    email: yup
        .string("E-mail should be string")
        .required("E-mail is required")
        .email("E-mail must be valid format."),
    department: yup.object().required("Department is required"),
});

export default StaffValidationSchema;
