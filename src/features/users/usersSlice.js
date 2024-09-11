import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

// Creating an entity adapter to manage the state of users.
const usersAdapter = createEntityAdapter();

// Getting the initial state from the adapter.
// This will hold the normalized users data structure.
const initialState = usersAdapter.getInitialState();

// Injecting new API endpoints into the existing `apiSlice`.
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      // The `transformResponse` function normalizes the response data using the adapter.
      // It sets the fetched users into the initial state.
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData);
      },
      // Providing cache tags for each user and the list.
      // This helps manage cache invalidation for users.
      providesTags: (result, error, arg) => [
        { type: "User", id: "LIST" }, // Tag for the whole user list.
        ...result.ids.map((id) => ({ type: "User", id })), // Tag for each individual user.
      ],
    }),
  }),
});

// Exporting the auto-generated hook for the `getUsers` query.
export const { useGetUsersQuery } = usersApiSlice;
