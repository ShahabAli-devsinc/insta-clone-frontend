import axiosInstance from "@/config/baseAxios";
import { Like } from "@/types/types";

export const likeApi = {
  create: async ({
    postId,
    userId,
  }: {
    postId: number;
    userId: number;
  }): Promise<Like> => {
    try {
      const response = await axiosInstance.post("/likes", {
        postId,
        userId,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to update profile, please try again");
    }
  },

  delete: async ({
    postId,
    userId,
  }: {
    postId: number;
    userId: number;
  }): Promise<Like> => {
    try {
      const response = await axiosInstance.delete("/likes", {
        data: {
          postId,
          userId,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete like, please try again");
    }
  },
};
