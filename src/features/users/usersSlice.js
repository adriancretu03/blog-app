import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "Walter Sobchak",
  },
  {
    id: "2",
    name: "Donny Kerabatsos",
  },
  {
    id: "3",
    name: "Maude Lebowski",
  },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
