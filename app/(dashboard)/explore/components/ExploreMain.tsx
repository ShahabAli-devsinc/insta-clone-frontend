import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExplorePosts from "./ExplorePosts";
import ExploreUsers from "./ExploreUsers";
import { useDispatch, useSelector } from "react-redux";
import {
  setExplorePosts,
  setExploreUsers,
  addExploreUsers,
  setPostsPagination,
  setUsersPagination,
  setLoading,
  addExplorePosts,
} from "@/store/features/exploreSlice";
import { exploreApi } from "@/services/exploreApi";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useDebounce } from "@/hooks/useDebounce";

const ExploreMain = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const { postsPagination, usersPagination } = useSelector(
    (state: RootState) => state.explore
  );

  const handleSearch = async () => {
    try {
      dispatch(setLoading(true));
      // Fetch filtered posts
      const { posts, total: totalPosts } = await exploreApi.getExplorePosts(
        1,
        10,
        debouncedSearchQuery
      );

      dispatch(setExplorePosts({ posts, total: totalPosts }));
      dispatch(
        setPostsPagination({
          currentPage: 1,
          totalPages: Math.ceil(totalPosts / 10),
        })
      );

      // Fetch filtered users
      const { users, total: totalUsers } = await exploreApi.getExploreUsers(
        1,
        10,
        debouncedSearchQuery
      );

      dispatch(setExploreUsers(users));
      dispatch(
        setUsersPagination({
          currentPage: 1,
          totalPages: Math.ceil(totalUsers / 10),
        })
      );
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchMorePosts = async () => {
    const nextPage = postsPagination.currentPage + 1;
    if (nextPage <= postsPagination.totalPages) {
      try {
        const { posts } = await exploreApi.getExplorePosts(
          nextPage,
          10,
          debouncedSearchQuery
        );

        dispatch(addExplorePosts(posts));

        dispatch(
          setPostsPagination({
            currentPage: nextPage,
            totalPages: postsPagination.totalPages,
          })
        );
      } catch (error) {
        console.error("Failed to fetch more posts:", error);
      }
    }
  };

  const fetchMoreUsers = async () => {
    const nextPage = usersPagination.currentPage + 1;
    if (nextPage <= usersPagination.totalPages) {
      try {
        const { users } = await exploreApi.getExploreUsers(
          nextPage,
          10,
          debouncedSearchQuery
        );
        dispatch(addExploreUsers(users));
        dispatch(
          setUsersPagination({
            currentPage: nextPage,
            totalPages: usersPagination.totalPages,
          })
        );
      } catch (error) {
        console.error("Failed to fetch more users:", error);
      }
    }
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchQuery]);

  return (
    <div className="mt-4">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search for users or hashtags..."
          className="w-3/4 p-2 border rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Search
        </button>
      </div>
      <Tabs
        defaultValue="posts"
        className="w-full justify-center flex flex-col items-center"
      >
        <TabsList className="flex w-[200px]">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <ExplorePosts onFetchMore={fetchMorePosts} />
        </TabsContent>
        <TabsContent value="users">
          <ExploreUsers onFetchMore={fetchMoreUsers} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExploreMain;
