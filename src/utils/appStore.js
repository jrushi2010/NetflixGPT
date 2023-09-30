import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../utils/userSlice';

const appStore = configureStore({
    reducer : {
        user: userSlice,
    },
})

export default appStore;