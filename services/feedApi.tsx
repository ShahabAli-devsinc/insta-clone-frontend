import axiosInstance from "@/config/baseAxios";

export const feedApi = {
  getUserFeed: async (page: number, limit: number) => {
    try {
      const response = await axiosInstance.get(`/posts/feed`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch feed posts");
    }
  },
};
