import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: "",
  reducers: {
    setComment(state, action) {
      return action.payload;
    },
  },
});

export const { setComment } = commentSlice.actions;

export const createComment = (content) => {
  return async (dispatch) => {
    dispatch(setComment(content));
  };
};

export default commentSlice.reducer;
