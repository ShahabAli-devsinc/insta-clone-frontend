import axiosInstance from "@/config/baseAxios";

export const feedApi = {
  getUserFeed: async () => {
    try {
      const response = await axiosInstance.get("/posts/feed");
      return response.data;
    } catch (error) {
      throw new Error("Failed to update profile, please try again");
    }
  },
};
