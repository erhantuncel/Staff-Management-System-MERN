import { createBrowserRouter } from "react-router";
import GuestDashboard from "./layouts/GuestDashboard";
import UserDashboard from "./layouts/UserDashboard";
import App from "./App";
import StaffList from "./pages/staffs/StaffList";
import NotFound from "./pages/errors/NotFound";

export const getRouter = () =>
    createBrowserRouter([
        {
            path: "/",
            Component: App,
            children: [
                {
                    index: true,
                    Component: GuestDashboard,
                },
                {
                    path: "/user",
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
                {
                    path: "*",
                    Component: NotFound,
                },
            ],
        },
    ]);
