import axiosInstance from "@/config/baseAxios";

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
      throw new Error("Failed to update profile, please try again");
    }
  },
};
