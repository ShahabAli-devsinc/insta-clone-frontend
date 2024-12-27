import axiosInstance from "@/config/baseAxios";
import { handleApiError } from "@/helpers";

export const UserApi = {
  updateProfile: async (formData: FormData) => {
    try {
      const response = await axiosInstance.patch("/users/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error, "Profile update failed. Try again.");
    }
  },

  getAllPlatformUsers: async () => {
    try {
      const response = await axiosInstance.get("/users/all");
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to fetch users.");
    }
  },
};
