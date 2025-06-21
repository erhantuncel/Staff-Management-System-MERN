import { createContext, useState } from "react";
import { loginUser } from "../api/services/AuthenticationService";
import { useNavigate } from "react-router";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");
    const navigate = useNavigate();

    const loginAction = async (data) => {
        try {
            const response = await loginUser(data);
            console.log(response);
            if (response.status === "success") {
                const { token, ...user } = response.data;
                setUser(user);
                setToken(token);
                localStorage.setItem("jwtToken", token);
                navigate("/user");
                return;
            }
            throw new Error(response.message);
        } catch (error) {
            console.log(error);
        }
    };

    const logOutAction = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("jwtToken");
        navigate("/login");
    };

    const authenticationContext = {
        user,
        token,
        loginAction,
        logOutAction,
    };
    return (
        <AuthenticationContext.Provider value={authenticationContext}>
            {children}
        </AuthenticationContext.Provider>
    );
};
