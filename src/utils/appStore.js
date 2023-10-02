import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../utils/userSlice';
import moviesSlice from '../utils/moviesSlice';

const appStore = configureStore({
    reducer : {
        user: userSlice,
        movies: moviesSlice,
    },
})

export default appStore;