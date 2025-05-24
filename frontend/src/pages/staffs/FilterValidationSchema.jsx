import * as yup from "yup";
import { useTranslation } from "react-i18next";

const getFilterValidation = () => {
    const { t } = useTranslation();
    const departmentDefaultValue = t("STAFF.select.department.label");
    const columnDefaultValue = t("STAFF.select.column.label");

    return yup.object().shape({
        department: yup
            .string()
            .test(
                "department",
                departmentDefaultValue,
                (value) => !(value === departmentDefaultValue),
            ),
        column: yup
            .string()
            .test(
                "column",
                columnDefaultValue,
                (value) => !(value === columnDefaultValue),
            ),
        keyword: yup.string().required(),
    });
};

export default getFilterValidation;
