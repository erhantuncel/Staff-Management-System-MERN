import { useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
    const { token } = useContext(AuthenticationContext);
    if (!token) {
        return <Navigate to="/login" />;
    } else {
        return <Outlet />;
    }
};

export default PrivateRoute;
