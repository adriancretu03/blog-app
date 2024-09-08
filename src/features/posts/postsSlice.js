import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "The Importance of Teamwork",
    content:
      "In sports, individual talent shines, but teamwork wins championships.",
  },
  {
    id: "2",
    title: "Pre-Game Routines",
    content:
      "A solid pre-game routine can be the difference between victory and defeat.",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
