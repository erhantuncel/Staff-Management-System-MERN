import React from "react";
import { useTranslation } from "react-i18next";

const StaffListTable = ({ staffArray }) => {
    const { t } = useTranslation();

    return (
        <div className="rounded-box border-base-content/5 mb-5 max-h-[calc(100vh-300px)] overflow-scroll border">
            <table className="table">
                <thead className="bg-base-300 text-base-content sticky top-0">
                    <tr>
                        <th>{t("STAFF.list.table.title.no")}</th>
                        <th>{t("STAFF.list.table.title.firstName")}</th>
                        <th>{t("STAFF.list.table.title.lastName")}</th>
                        <th>{t("STAFF.list.table.title.departmentName")}</th>
                        <th>{t("STAFF.list.table.title.registeredDate")}</th>
                        <th className="lg:w-1/4 xl:w-1/5">
                            {t("STAFF.list.table.title.actions")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {staffArray.map((staff) => (
                        <tr>
                            <th>{staff.id}</th>
                            <td>{staff.firstName}</td>
                            <td>{staff.lastName}</td>
                            <td>{staff.department}</td>
                            <td>23.04.2024 18:17</td>
                            <td className="text-right">
                                <button className="btn btn-sm btn-soft mr-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        class="size-4"
                                    >
                                        <path d="M6 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                                        <path
                                            fill-rule="evenodd"
                                            d="M4 2a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V6.621a1.5 1.5 0 0 0-.44-1.06L9.94 2.439A1.5 1.5 0 0 0 8.878 2H4Zm3.5 2.5a3 3 0 1 0 1.524 5.585l1.196 1.195a.75.75 0 1 0 1.06-1.06l-1.195-1.196A3 3 0 0 0 7.5 4.5Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>

                                    <span className="hidden lg:flex">
                                        {t(
                                            "STAFF.list.table.row.button.detail",
                                        )}
                                    </span>
                                </button>
                                <button className="btn btn-sm btn-soft">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        class="size-4"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>

                                    <span className="hidden lg:flex">
                                        {t(
                                            "STAFF.list.table.row.button.delete",
                                        )}
                                    </span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StaffListTable;
