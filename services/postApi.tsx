import axiosInstance from "@/config/baseAxios";

export const PostApi = {
  create: async (postData: { imageUrl: string; caption: string }) => {
    try {
      const response = await axiosInstance.post("/posts", postData);
      return response.data;
    } catch (error) {
      throw new Error("Error occurred while creating post.");
    }
  },

  fetchAll: async () => {
    try {
      const response = await axiosInstance.get("/posts/user-posts");
      return response.data;
    } catch (error) {
      throw new Error("Error occurred while fetching posts.");
    }
  },

  update: async (id: number, updatedPostPayload: { caption: string }) => {
    try {
      const response = await axiosInstance.patch(
        `/posts/${id}`,
        updatedPostPayload
      );
      return response.data;
    } catch (error) {
      throw new Error("Error occurred while updating post.");
    }
  },

  delete: async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error occurred while deleting post.");
    }
  },
};