import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean;
  passcode: string;
  languageCode: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  passcode: '',
  languageCode: ''
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
    saveLanguageCode: (state, action) => {
      state.languageCode = action.payload.languageCode;
    },
    removeLanguageCode: (state) => {
      state.languageCode = '';
    },
    removeAuth: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { authenticate, savePasscode, removePasscode, saveLanguageCode, removeLanguageCode, removeAuth } = authSlice.actions;

export const selectAuthStatus = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectPasscode = (state: { auth: AuthState }) => state.auth.passcode;
export const selectLanguageCode = (state: { auth: AuthState }) => state.auth.languageCode;

export default authSlice.reducer;