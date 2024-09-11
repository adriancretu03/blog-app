import { createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

// Creating an entity adapter for posts to manage normalization of state and sorting.
const postsAdapter = createEntityAdapter({
  // Sorting posts by date in descending order (latest posts first).
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// Initializing the post state
const initialState = postsAdapter.getInitialState();

// Extending the base `apiSlice` with additional endpoints related to posts.
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (responseData) => {
        // Adding a default date to posts if they don't have one, for consistent sorting.
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          if (!post?.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          return post;
        });
        // Normalizing the post data and setting it into the initial state using the adapter.
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      // Providing a cache tag for the post list, and individual post IDs for cache invalidation.
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),
    getPostsByUserId: builder.query({
      query: (id) => `/posts/?userId=${id}`,
      transformResponse: (responseData) => {
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          if (!post?.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();

          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => {
        return [...result.ids.map((id) => ({ type: "Post", id }))];
      },
    }),
    // Mutation to add a new post, sending a POST request.
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...initialPost, // Sending the new post data in the request body
          userId: Number(initialPost.userId),
          date: new Date().toISOString(),
        },
      }),
      // Invalidating the cache for the post list to refresh it after adding a new post.
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (initialPost) => ({
        url: `/posts/${initialPost.id}`,
        method: "PUT",
        body: {
          ...initialPost,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: {
          id,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
  }),
});

// Exporting the auto-generated hooks for the above queries and mutations
export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = extendedApiSlice;
