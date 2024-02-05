import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../features/LogAuth";
import productDataSlice from "../features/ProductData";
import cartDataSlice from "../features/CartData";
export let Store = configureStore({
  reducer: { LoginSlice, productDataSlice, cartDataSlice },
});
