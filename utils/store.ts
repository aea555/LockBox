import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import * as SecureStore from "expo-secure-store";

interface PreloadedState {
  auth: {
    isAuthenticated: boolean;
    passcode: string;
  };
}

let preloadedState: PreloadedState | undefined;
const persistedPasscode = SecureStore.getItem("passcode");

if (
  persistedPasscode 
) {
  preloadedState = {
    auth: {
      isAuthenticated: false,
      passcode: persistedPasscode
    },
  };
}

export default configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: preloadedState,
});
