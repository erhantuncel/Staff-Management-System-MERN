import React from "react";
import { Translation } from "react-i18next";

const Header = () => {
    return (
        <Translation>
            {(t, { i18n }) => {
                return (
                    <div className="navbar bg-neutral text-neutral-content shadow-sm">
                        <div className="navbar-start lg:w-3/12">
                            <div className="dropdown">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost lg:hidden"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        {" "}
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h8m-8 6h16"
                                        />{" "}
                                    </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
                                >
                                    <li>
                                        <a>Departments</a>
                                    </li>
                                    <li>
                                        <a>Staffs</a>
                                    </li>
                                </ul>
                            </div>
                            <a className="text-lg font-bold lg:text-lg">
                                {t("TEMPLATE.HEADER.NAVBAR.title")}
                            </a>
                        </div>
                        <div className="navbar-center hidden lg:flex lg:grow">
                            <ul className="menu menu-horizontal px-1">
                                <li className="hover:bg-base-300 hover:text-base-content">
                                    <a>Item 1</a>
                                </li>
                                <li className="hover:bg-base-300 hover:text-base-content">
                                    <a>Item 2</a>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar-end lg:w-3/12">
                            <a className="btn btn-outline">Button</a>
                        </div>
                    </div>
                );
            }}
        </Translation>
    );
};

export default Header;
