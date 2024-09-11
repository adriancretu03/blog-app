import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // optional
  // Setting up the base query with a base URL for all HTTP requests made through this slice.
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  // These tags will be associated with API endpoints (like 'Post' and 'User').
  tagTypes: ["Post", "User"],
  // Defining API endpoints.
  endpoints: (builder) => ({}),
});
