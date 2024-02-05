import { createSlice } from "@reduxjs/toolkit";

let LoginSlice = createSlice({
  name: "LoginSlice",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: JSON.parse(localStorage.getItem("token")) || "",
  },
  reducers: {
    login: (state, { payload }) => {
      state.user = payload.data;
      state.token = payload.token;
      localStorage.setItem("user", JSON.stringify(payload.data));
      localStorage.setItem("token", JSON.stringify(payload.token));
    },
    logOut: (state) => {
      state.user = {};
      state.token = "";
      localStorage.clear();
    },
  },
});
export default LoginSlice.reducer;
export const { login, logOut } = LoginSlice.actions;
