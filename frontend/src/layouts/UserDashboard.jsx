import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

const UserDashboard = () => {
    return (
        <div className="flex h-screen w-screen flex-col">
            <Header />
            <div className="m-10 mt-2 mb-auto lg:m-20 lg:mt-5 lg:mb-auto">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default UserDashboard;
