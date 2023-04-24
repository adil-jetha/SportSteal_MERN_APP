// Include the necessary Redux Toolkit function import.
import { createSlice } from "@reduxjs/toolkit";
// Specify the auth slice's initial state
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};
// Using the createSlice function, make the auth slice.
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Alternate between light and dark modes.
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // When a user logs in, set the user and token.
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // When a user logs out, remove the user and token.    
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // The user's friends list will be updated.
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    // Change the posts' state
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      // Change a specific state post.
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});
// Export the reducer and actions from the authentication slice.
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;















