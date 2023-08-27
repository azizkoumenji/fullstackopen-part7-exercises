import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    delUser(state, action) {
      return null;
    },
  },
});

export const { setUser, delUser } = userSlice.actions;

export const logUser = (user) => {
  return async (dispatch) => {
    try {
      const returnResult = await loginService.login(user);
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(returnResult)
      );
      blogService.setToken(returnResult.token);
      dispatch(setUser(returnResult));
    } catch {
      dispatch(setNotification("Wrong username or password", 5));
    }
  };
};

export const userAreadyLogged = (user) => {
  return (dispatch) => {
    dispatch(setUser(user));
    blogService.setToken(user.token);
  };
};

export const outUser = () => {
  return async (dispatch) => {
    dispatch(delUser());
    window.localStorage.removeItem("loggedBlogappUser");
  };
};

export default userSlice.reducer;
