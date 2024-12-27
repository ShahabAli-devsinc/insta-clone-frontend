import axiosInstance from "@/config/baseAxios";
import { handleApiError } from "@/helpers";

export const AuthApi = {
  login: async (credentials: { username: string; password: string }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      handleApiError(error, "Login failed. Try again.");
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
    } catch (error) {
      handleApiError(error, "Registeration failed. Please try again.");
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
