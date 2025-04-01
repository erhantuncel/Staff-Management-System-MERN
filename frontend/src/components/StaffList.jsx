import React from "react";
import { Translation } from "react-i18next";

const StaffList = () => {
    let staffArray = [];
    for (let i = 0; i <= 25; i++) {
        staffArray.push({
            id: i + 1,
            firstName: "First Name " + i,
            lastName: "Last Name " + i,
            department: "Department" + i,
        });
    }

    return (
        <Translation>
            {(t, { i18n }) => {
                return (
                    <>
                        <div className="mb-5 flex justify-start">
                            <button className="btn btn-sm btn-neutral">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    class="size-4"
                                >
                                    <path d="M8.5 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 13c.552 0 1.01-.452.9-.994a5.002 5.002 0 0 0-9.802 0c-.109.542.35.994.902.994h8ZM12.5 3.5a.75.75 0 0 1 .75.75v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0v-1h-1a.75.75 0 0 1 0-1.5h1v-1a.75.75 0 0 1 .75-.75Z" />
                                </svg>
                                {t("STAFF.button.addStaff")}
                            </button>
                        </div>
                        <div className="mb-2 grid grid-cols-2">
                            <div className="flex content-center gap-1 justify-self-start">
                                <span className="content-center">
                                    {t("STAFF.list.table.label.entryCount1")}
                                </span>
                                <select
                                    defaultValue="5"
                                    className="select select-sm w-14 flex-none"
                                >
                                    <option>5</option>
                                    <option>10</option>
                                    <option>15</option>
                                </select>
                                <span className="content-center">
                                    {t("STAFF.list.table.label.entryCount2")}
                                </span>
                            </div>
                            <div className="flex justify-end gap-1">
                                <select
                                    defaultValue="Departman Seçiniz"
                                    className="select select-sm"
                                >
                                    <option disabled={true}>
                                        {t("STAFF.select.department.label")}
                                    </option>
                                    <option>Üretim</option>
                                    <option>Finans</option>
                                    <option>Ar-Ge</option>
                                </select>
                                <select
                                    defaultValue="Sütun Seçiniz"
                                    className="select select-sm"
                                >
                                    <option disabled={true}>
                                        {t("STAFF.select.column.label")}
                                    </option>
                                    <option>
                                        {t(
                                            "STAFF.list.table.searchType.firstName",
                                        )}
                                    </option>
                                    <option>
                                        {t(
                                            "STAFF.list.table.searchType.lastName",
                                        )}
                                    </option>
                                </select>
                                <input
                                    type="text"
                                    placeholder=""
                                    className="input input-sm"
                                />
                                <button className="btn btn-neutral btn-sm">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        class="size-4"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    {t("STAFF.list.table.button.searchStaff")}
                                </button>
                            </div>
                        </div>
                        <div className="rounded-box border-base-content/5 mb-5 max-h-[calc(100vh-300px)] overflow-scroll border">
                            <table className="table">
                                <thead className="bg-base-300 text-base-content sticky top-0">
                                    <tr>
                                        <th>
                                            {t("STAFF.list.table.title.no")}
                                        </th>
                                        <th>
                                            {t(
                                                "STAFF.list.table.title.firstName",
                                            )}
                                        </th>
                                        <th>
                                            {t(
                                                "STAFF.list.table.title.lastName",
                                            )}
                                        </th>
                                        <th>
                                            {t(
                                                "STAFF.list.table.title.departmentName",
                                            )}
                                        </th>
                                        <th>
                                            {t(
                                                "STAFF.list.table.title.registeredDate",
                                            )}
                                        </th>
                                        <th className="lg:w-1/4 xl:w-1/5">
                                            {t(
                                                "STAFF.list.table.title.actions",
                                            )}
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
                        <div class="mb-5 hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p class="text-sm text-gray-700">
                                    {t(
                                        "STAFF.list.table.label.entryInformation",
                                        {
                                            totalEntry: 10,
                                            rangeStart: 1,
                                            rangeEnd: 5,
                                        },
                                    )}
                                </p>
                            </div>
                            <div className="join">
                                <button className="join-item btn btn-sm btn-soft">
                                    1
                                </button>
                                <button className="join-item btn btn-sm btn-soft btn-active">
                                    2
                                </button>
                                <button className="join-item btn btn-sm btn-soft">
                                    3
                                </button>
                                <button className="join-item btn btn-sm btn-soft">
                                    4
                                </button>
                            </div>
                        </div>
                    </>
                );
            }}
        </Translation>
    );
};

export default StaffList;
