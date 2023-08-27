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
    const returnBlog = await blogService.create(content);
    const blogs = await blogService.getAll();
    const newBlog = blogs.filter((blog) => blog.id === returnBlog.id);
    dispatch(appendBlog(newBlog[0]));
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
    await blogService.modify(newBlog);
    dispatch(newLike(newBlog));
  };
};

export default blogSlice.reducer;
