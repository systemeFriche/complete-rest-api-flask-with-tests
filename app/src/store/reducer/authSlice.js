import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: "",
    refreshToken: "",
    userId: null
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.userId = action.payload.userId
    }, 
    logout: state => {
      state.accessToken = ""
      state.refreshToken = ""
      state.userId = null
    } 
  }
});

export const { login, logout } = authSlice.actions;
export const authAccessToken = state => state.auth.accessToken;
export const authRefreshToken = state => state.auth.refreshToken;
export const authUserId = state => state.auth.userId;
export const authReducer = authSlice.reducer;


