import axios from "axios";
import { StorageKeys } from "../utils/constants.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    timeout: 10000,     // retry after 10 seconds otherwise it retry after some times
});

// middleware
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    Promise.reject(error);
})

export default axiosInstance;