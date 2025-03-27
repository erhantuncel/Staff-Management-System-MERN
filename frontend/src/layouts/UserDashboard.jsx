import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const UserDashboard = () => {
    return (
        <div className="flex h-screen w-screen flex-col">
            <Header />
            <div className="mb-auto">Content</div>
            <Footer />
        </div>
    );
};

export default UserDashboard;
