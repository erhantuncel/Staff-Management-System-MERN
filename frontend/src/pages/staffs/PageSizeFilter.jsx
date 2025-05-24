import { useContext } from "react";
import Select from "../../components/form/Select";
import { useTranslation } from "react-i18next";
import { StaffListContext } from "../../contexts/StaffListContext";

const PageSizeFilter = () => {
    const { t } = useTranslation();

    const pageSizeOptions = [
        { key: "1", label: "5", value: 5 },
        { key: "2", label: "10", value: 10 },
        { key: "3", label: "15", value: 15 },
    ];

    const { pagination, setPagination } = useContext(StaffListContext);

    const handleChange = (event) => {
        setPagination({ pageSize: event.target.value, page: 1 });
    };

    return (
        <form>
            <div className="flex content-center gap-1 justify-self-start">
                <span className="content-center">
                    {t("STAFF.list.table.label.entryCount1")}
                </span>
                <Select
                    // defaultValue="5"
                    className="select select-sm w-15 flex-none"
                    options={pageSizeOptions}
                    onChange={handleChange}
                    value={pagination.pageSize}
                />
                <span className="content-center">
                    {t("STAFF.list.table.label.entryCount2")}
                </span>
            </div>
        </form>
    );
};

export default PageSizeFilter;
