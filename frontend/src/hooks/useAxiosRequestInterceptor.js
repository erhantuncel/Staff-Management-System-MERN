import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { axios } from "../api/config/axios-config";

export const useAxiosRequestInterceptor = () => {
    const { token } = useContext(AuthenticationContext);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        axios.interceptors.request.use((request) => {
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
            return request;
        });
        setReady(true);
    }, [token]);

    return ready;
};
