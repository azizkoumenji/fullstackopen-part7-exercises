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
    delBlog(state, action) {
      const result = state.filter((blog) => action.payload.id !== blog.id);
      return result;
    },
    newLike(state, action) {
      const result = state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
      return result;
    },
  },
});

export const { appendBlog, setBlogs, delBlog, newLike } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog);
    dispatch(delBlog(blog));
  };
};

export const addLike = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.modify(newBlog);
    dispatch(newLike(blog));
  };
};

export default blogSlice.reducer;
