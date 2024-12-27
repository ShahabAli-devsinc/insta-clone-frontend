import axiosInstance from "@/config/baseAxios";
import { AxiosError } from "axios";

export const AuthApi = {
  login: async (credentials: { username: string; password: string }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      throw new Error("Login failed, please check your credentials");
    }
  },

  register: async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.post("/auth/register", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      return response.data;
    } catch (error) {
      throw new Error("Failed to logout.");
    }
  },
};
