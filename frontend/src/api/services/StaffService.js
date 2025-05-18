import { apiClient } from "../config/axios-config";

const baseURL = "/staffs";

export const getAllStaffs = async () => {
    const response = await apiClient.get(baseURL, null);
    return response.data;
};

export const getAllStaffWithPagination = async (page, pageSize) => {
    const response = await apiClient.get(`${baseURL}/pagination`, {
        params: { page: page, pageSize: pageSize },
    });
    return response.data;
};

export const createStaff = async (data) => {
    const response = await apiClient.post(baseURL, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updateStaff = async (id, data) => {
    const response = await apiClient.put(`${baseURL}/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const removeStaff = async (id) => {
    const response = await apiClient.delete(`${baseURL}/${id}`, null);
    return response.data;
};
