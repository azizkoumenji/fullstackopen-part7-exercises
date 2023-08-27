import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const getUsers = () => {
  return async (dispatch) => {
    const returnResult = await usersService.getAll();
    dispatch(setUsers(returnResult));
  };
};

export default usersSlice.reducer;
