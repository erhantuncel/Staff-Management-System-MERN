import Axios from "axios";

export const axios = Axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL,
});

export const apiClient = {
    get: (route, config) => axios.get(route, config),
    post: (route, data, config) => axios.post(route, data, config),
    put: (route, data, config) => axios.put(route, data, config),
    delete: (route, config) => axios.delete(route, config),
};
