import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Route, Routes } from "react-router";
import DepartmentList from "../components/DeparmentList";
import Staffs from "../components/staffs/Staffs";

const UserDashboard = () => {
    return (
        <div className="flex h-screen w-screen flex-col">
            <Header />
            <div className="m-10 mt-2 mb-auto lg:m-20 lg:mt-5 lg:mb-auto">
                <Routes>
                    <Route path="/" element={<DepartmentList />} />
                    <Route path="/departments" element={<DepartmentList />} />
                    <Route path="/staffs" element={<Staffs />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default UserDashboard;
