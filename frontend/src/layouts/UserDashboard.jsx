import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Route, Routes } from "react-router";
import StaffList from "../components/StaffList";
import DepartmentList from "../components/DeparmentList";

const UserDashboard = () => {
    return (
        <div className="flex h-screen w-screen flex-col">
            <Header />
            <div className="mb-auto">
                <Routes>
                    <Route path="/" element={<DepartmentList />} />
                    <Route path="/departments" element={<DepartmentList />} />
                    <Route path="/staffs" element={<StaffList />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default UserDashboard;
