import { Slide, ToastContainer } from "react-toastify";
import { Outlet } from "react-router";
import { useAxiosRequestInterceptor } from "./hooks/useAxiosRequestInterceptor";

function App() {
    return (
        <>
            {useAxiosRequestInterceptor() && <Outlet />}
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
