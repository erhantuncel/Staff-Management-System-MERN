import { createBrowserRouter } from "react-router";
import UserDashboard from "./layouts/UserDashboard";
import App from "./App";
import StaffList from "./pages/staffs/StaffList";
import NotFound from "./pages/errors/NotFound";
import RegistrationPage from "./pages/authentication/RegistrationPage";
import LoginPage from "./pages/authentication/LoginPage";
import PrivateRoute from "./components/PrivateRoute";

export const getRouter = () =>
    createBrowserRouter([
        {
            path: "/",
            Component: App,
            children: [
                {
                    index: true,
                    Component: LoginPage,
                },
                {
                    path: "/register",
                    Component: RegistrationPage,
                },
                {
                    path: "/login",
                    Component: LoginPage,
                },
                {
                    path: "/user",
                    Component: PrivateRoute,
                    children: [
                        {
                            Component: UserDashboard,
                            children: [
                                {
                                    index: true,
                                    Component: StaffList,
                                },
                                {
                                    path: "staffs",
                                    Component: StaffList,
                                },
                            ],
                        },
                    ],
                },
                {
                    path: "*",
                    Component: NotFound,
                },
            ],
        },
    ]);
