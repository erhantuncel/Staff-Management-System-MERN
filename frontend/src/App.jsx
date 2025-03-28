import React from "react";

import UserDashboard from "./layouts/UserDashboard.jsx";
import { Slide, ToastContainer } from "react-toastify";

function App() {
    return (
        <>
            <UserDashboard />
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
