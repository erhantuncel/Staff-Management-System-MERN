import React from "react";

import UserDashboard from "./layouts/UserDashboard.jsx";
import GuestDashboard from "./layouts/GuestDashboard.jsx";
import { Slide, ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router";

function App() {
    return (
        <>
            <Routes>
                <Route path="/user/*" element={<UserDashboard />} />
                <Route path="/" element={<GuestDashboard />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            />
        </>
    );
}

export default App;
