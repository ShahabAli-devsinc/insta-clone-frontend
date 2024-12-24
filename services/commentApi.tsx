import axiosInstance from "@/config/baseAxios";
import { Comment } from "@/types/types";

export const commentApi = {
  create: async ({
    postId,
    userId,
    comment,
  }: {
    postId: number;
    userId: number;
    comment: string;
  }): Promise<Comment> => {
    try {
      const response = await axiosInstance.post("/comments", {
        postId,
        userId,
        comment,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to update profile, please try again");
    }
  },
};
