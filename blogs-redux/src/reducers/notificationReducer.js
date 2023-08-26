import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    reduceNotification(state, action) {
      return action.payload;
    },
  },
});

export const { reduceNotification } = notificationSlice.actions;

export const setNotification = (content, duration) => {
  return (dispatch) => {
    dispatch(reduceNotification(content));
    setTimeout(() => {
      dispatch(reduceNotification(null));
    }, duration * 1000);
  };
};

export default notificationSlice.reducer;
