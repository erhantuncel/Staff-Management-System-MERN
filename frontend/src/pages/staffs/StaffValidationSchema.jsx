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
    image: yup
        .mixed()
        .nullable(true)
        .test("fileType", "Unsupported file format", (value) => {
            return value
                ? ["image/png", "image/jpeg"].includes(value.type)
                : true;
        })
        .test("fileSize", "File size too large", (value) => {
            return value ? value.size <= 2 * 1024 * 1024 : true;
        }),
});

export default StaffValidationSchema;
