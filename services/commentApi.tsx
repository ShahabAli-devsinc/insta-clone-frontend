import axiosInstance from "@/config/baseAxios";
import { Comment } from "@/types/types";

export const commentApi = {
  create: async ({
    postId,
    userId,
    content,
  }: {
    postId: number;
    userId: number;
    content: string;
  }): Promise<Comment> => {
    try {
      const response = await axiosInstance.post("/comments", {
        postId,
        userId,
        content,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to update profile, please try again");
    }
  },
};
