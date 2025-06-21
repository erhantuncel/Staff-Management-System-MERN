import React from "react";

import { Slide, ToastContainer } from "react-toastify";
import { Outlet } from "react-router";
import { AuthenticationContextProvider } from "./contexts/AuthenticationContext";

function App() {
    return (
        <>
            <AuthenticationContextProvider>
                <Outlet />
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
            </AuthenticationContextProvider>
        </>
    );
}

export default App;
