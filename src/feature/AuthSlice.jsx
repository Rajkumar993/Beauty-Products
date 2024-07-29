import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';


const userId = () => {
  try {
    const cookieValue = Cookies.get('ualum');
    if (cookieValue) {
      const decodedValue = JSON.parse(cookieValue);
      const decodedAuth = jwtDecode(decodedValue.auth);
      return parseInt(decodedAuth.user_id);
    }
    return null;
  } catch (error) {
    return null;
  }
};
let ID = userId();

const AuthSlice=createSlice({
  name: 'auth',
  initialState: {
    authState: ID ? true : false,
    userId: ID,
  },
  reducers: {
    login: (state, action) => {
      state.authState = true;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.authState = false;
      state.userId = null;
    },
  },
});

export const {login,logout}=AuthSlice.actions

export default AuthSlice.reducer