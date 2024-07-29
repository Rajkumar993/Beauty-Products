import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from "../feature/AuthSlice"
import CartLenghtReducer from '../feature/CartLengthSlice'
export const Store = configureStore({
  reducer: {
    auth: AuthReducer,
    clength:CartLenghtReducer
  },
});

