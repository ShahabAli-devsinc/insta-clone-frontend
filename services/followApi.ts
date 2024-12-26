import axiosInstance from "@/config/baseAxios";

export const followApi = {
  fetchFollowers: async (userId: number) => {
    try {
      const response = await axiosInstance.get(`/follow/followers/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error occurred while fetching followers.");
    }
  },

  fetchFollowing: async (userId: number) => {
    try {
      const response = await axiosInstance.get(`/follow/following/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error occurred while fetching following.");
    }
  },

  followUser: async (followingId: number) => {
    try {
      const response = await axiosInstance.post(`/follow`, { followingId });
      return response.data;
    } catch (error) {
      throw new Error("Error occurred while following the user.");
    }
  },

  unfollowUser: async (followingId: number) => {
    try {
      const response = await axiosInstance.delete(`/follow/${followingId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error occurred while unfollowing the user.");
    }
  },
};
