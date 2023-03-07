import { configureStore } from "@reduxjs/toolkit";
import authslice from "./AuthSlice";
import sentboxslice from "./Sentboxslice";

const store = configureStore({
    reducer:{auth:authslice.reducer,sent:sentboxslice.reducer}
})

export default store