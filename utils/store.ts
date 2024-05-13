import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import * as SecureStore from "expo-secure-store";

interface PreloadedState {
  auth: {
    isAuthenticated: boolean;
    passcode: string;
    languageCode: string;
  };
}

let preloadedState: PreloadedState | undefined;
const persistedPasscode = SecureStore.getItem("passcode");
const persistedLanguageCode = SecureStore.getItem("language-code");

if (persistedPasscode && persistedLanguageCode) {
  preloadedState = {
    auth: {
      isAuthenticated: false,
      passcode: persistedPasscode,
      languageCode: persistedLanguageCode,
    },
  };
}

export default configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: preloadedState,
});
