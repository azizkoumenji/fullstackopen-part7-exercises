import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  function compareNumbers(a, b) {
    return b.likes - a.likes;
  }

  return async (dispatch) => {
    let blogs = await blogService.getAll();
    blogs = blogs.sort(compareNumbers);
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export default blogSlice.reducer;
