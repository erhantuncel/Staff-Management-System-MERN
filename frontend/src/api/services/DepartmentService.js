import { apiClient } from "../config/axios-config";

const baseURL = "/departments";

export const getDistinctDepartments = async () => {
    const response = await apiClient.get(baseURL, null);
    return response.data;
};
