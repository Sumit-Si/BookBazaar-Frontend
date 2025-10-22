import axiosInstance from "./axios";
import { StorageKeys } from "../utils/constants.js";

const authService = {
  register: async (userData) => {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  },
  login: async (credientials) => {
    const response = await axiosInstance.post("/auth/login", credientials);

    if (response.data?.data?.accessToken) {
      localStorage.setItem(
        StorageKeys.ACCESS_TOKEN,
        response.data.data.accessToken
      );
    }

    if (response.data?.data?.refreshToken) {
      localStorage.setItem(
        StorageKeys.REFRESH_TOKEN,
        response.data.data.refreshToken
      );
    }
  },
  logout: async () => {
    const response = await axiosInstance.get("/auth/logout");

    localStorage.removeItem(
      StorageKeys.ACCESS_TOKEN,
      response.data.data.accessToken
    );
    localStorage.removeItem(
      StorageKeys.REFRESH_TOKEN,
      response.data.data.refreshToken
    );
  },
};

export default authService;
