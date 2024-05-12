import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean;
  passcode: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  passcode: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    authenticate: (state) => {
      state.isAuthenticated = true;
    },
    savePasscode: (state, action) => {
      state.passcode = action.payload.passcode;
    },
    removePasscode: (state) => {
      state.passcode = '';
    },
    removeAuth: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { authenticate, savePasscode, removePasscode, removeAuth } = authSlice.actions;

export const selectAuthStatus = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectPasscode = (state: { auth: AuthState }) => state.auth.passcode;

export default authSlice.reducer;