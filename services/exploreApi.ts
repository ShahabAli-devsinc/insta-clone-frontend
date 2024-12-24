import axiosInstance from "@/config/baseAxios";

export const exploreApi = {
  getExplorePosts: async (
    page: number = 1,
    limit: number = 10,
    query: string = ""
  ) => {
    try {
      const response = await axiosInstance.get("/explore/posts", {
        params: { page, limit, query },
      });
      return response.data; // { posts: Post[], total: number }
    } catch (error) {
      throw new Error("Failed to fetch posts");
    }
  },

  getExploreUsers: async (
    page: number = 1,
    limit: number = 10,
    query: string = ""
  ) => {
    try {
      const response = await axiosInstance.get("/explore/users", {
        params: { page, limit, query },
      });
      return response.data; // { users: UserPopulated[], total: number }
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  },
};
