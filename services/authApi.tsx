import axiosInstance from "@/config/baseAxios";

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
    } catch (error) {
      throw new Error("Registration failed, please try again");
    }
  },
};
