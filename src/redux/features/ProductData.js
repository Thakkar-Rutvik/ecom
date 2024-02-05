import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BE_URL } from "../../configue";

export let fetchProductData = createAsyncThunk("fetchProductData", () => {
  return axios({
    method: "get",
    url: `${BE_URL}/product/getAll`,
  })
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
});

let productDataSlice = createSlice({
  name: "productDataSlice",
  initialState: {
    data: [],
    count: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductData.fulfilled, (state, { payload }) => {
      state.data = payload?.data;
      state.count = payload?.count;
    });
  },
});

export default productDataSlice.reducer;
