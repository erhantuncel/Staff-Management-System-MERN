import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import ArrowLeftStartOnRectangleIcon from "../components/icons/ArrowLeftStartOnRectangleIcon";
import { useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

const Header = () => {
    const { t } = useTranslation();

    const { logOutAction } = useContext(AuthenticationContext);

    const handleDropDownItemClick = () => {
        const elem = document.activeElement;
        if (elem) {
            elem?.blur();
        }
    };

    const menuItems = [
        {
            label: t("TEMPLATE.HEADER.NAVBAR.link.staff.label"),
            route: "/user/staffs",
        },
    ];

    return (
        <div className="navbar bg-neutral text-neutral-content shadow-sm">
            <div className="navbar-start lg:w-3/12">
                {menuItems.length > 1 && (
                    <div className="dropdown mr-2">
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
                            className="menu menu-sm dropdown-content bg-neutral rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={handleDropDownItemClick}
                                >
                                    <NavLink to={item.route}>
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <NavLink className="text-lg font-bold lg:text-lg" to="/">
                    {t("TEMPLATE.HEADER.NAVBAR.title")}
                </NavLink>
            </div>
            <div className="navbar-center hidden lg:flex lg:grow">
                <ul className="menu menu-horizontal px-1">
                    {menuItems.length > 1 &&
                        menuItems.map((item, index) => (
                            <li
                                key={index}
                                className="hover:bg-base-300 hover:text-base-content"
                            >
                                <NavLink to={item.route}>{item.label}</NavLink>
                            </li>
                        ))}
                </ul>
            </div>
            <div className="navbar-end lg:w-3/12">
                <a
                    className="btn btn-outline btn-md border-gray-500"
                    onClick={logOutAction}
                >
                    <ArrowLeftStartOnRectangleIcon type="mini" />
                    {t("LOGOUT.button.logout.label")}
                </a>
            </div>
        </div>
    );
};

export default Header;
