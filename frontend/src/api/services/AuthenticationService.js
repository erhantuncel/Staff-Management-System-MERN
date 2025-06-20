import { apiClient } from "../config/axios-config";

const baseURL = "/users";

export const registerUser = async (data) => {
    const response = await apiClient.post(`${baseURL}/register`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};
