import { configureStore } from "@reduxjs/toolkit";
import authslice from "./AuthSlice";

const store = configureStore({
    reducer:{auth:authslice.reducer}
})

export default store