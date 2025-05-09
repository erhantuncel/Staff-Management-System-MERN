import { useTranslation } from "react-i18next";
import * as yup from "yup";

const getStaffValidation = () => {
    const { t } = useTranslation();

    return yup.object().shape({
        firstName: yup
            .string()
            .required(t("STAFF.ADDUPDATEDETAILMODAL.invalid.message.required"))
            .max(
                40,
                t("STAFF.ADDUPDATEDETAILMODAL.invalid.message.max.character", {
                    maxChar: 40,
                }),
            ),
        lastName: yup
            .string()
            .required(t("STAFF.ADDUPDATEDETAILMODAL.invalid.message.required"))
            .max(
                40,
                t("STAFF.ADDUPDATEDETAILMODAL.invalid.message.max.character", {
                    maxChar: 40,
                }),
            ),
        phone: yup
            .string()
            .required(t("STAFF.ADDUPDATEDETAILMODAL.invalid.message.required"))
            .length(
                10,
                t("STAFF.ADDUPDATEDETAILMODAL.invalid.message.phone.pattern", {
                    numberCount: 10,
                }),
            ),
        email: yup
            .string()
            .required(t("STAFF.ADDUPDATEDETAILMODAL.invalid.message.required"))
            .email(
                t("STAFF.ADDUPDATEDETAILMODAL.invalid.message.email.format"),
            ),
        department: yup
            .object()
            .required(t("STAFF.ADDUPDATEDETAILMODAL.invalid.message.required")),
        image: yup
            .mixed()
            .nullable(true)
            .test(
                "fileType",
                t(
                    "STAFF.ADDUPDATEDETAILMODAL.image.validation.error.fileType",
                    { fileTypes: ".png, .jpeg" },
                ),
                (value) => {
                    return value
                        ? ["image/png", "image/jpeg"].includes(value.type)
                        : true;
                },
            )
            .test(
                "fileSize",
                t(
                    "STAFF.ADDUPDATEDETAILMODAL.image.validation.error.fileSize",
                    { fileSize: "2MB" },
                ),
                (value) => {
                    return value ? value.size <= 2 * 1024 * 1024 : true;
                },
            ),
    });
};

export default getStaffValidation;
