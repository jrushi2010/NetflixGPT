import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../utils/userSlice';
import moviesSlice from '../utils/moviesSlice';
import gptSlice from "./gptSlice";

const appStore = configureStore({
    reducer : {
        user: userSlice,
        movies: moviesSlice,
        gpt: gptSlice,
    },
})

export default appStore;