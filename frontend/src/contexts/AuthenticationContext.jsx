import { createContext, useState } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");

    const authenticationContext = {
        user,
        setUser,
        token,
        setToken,
    };
    return (
        <AuthenticationContext.Provider value={authenticationContext}>
            {children}
        </AuthenticationContext.Provider>
    );
};
