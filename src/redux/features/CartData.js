import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BE_URL } from "../../configue";

export let getAllCartItem = createAsyncThunk("getAllCartItem", () => {
  return axios({
    method: "get",
    url: `${BE_URL}/cart/getAll`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  })
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
});

let cartDataSlice = createSlice({
  name: "cartDataSlice",
  initialState: {
    cartData: [],
    cartId: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCartItem.fulfilled, (state, { payload }) => {
      state.cartData = payload?.data;
      state.cartId = payload?.cartId;
    });
  },
});

export default cartDataSlice.reducer;
