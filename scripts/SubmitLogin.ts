import "react-native-get-random-values";
import { Dispatch } from "redux";
import * as SecureStore from "expo-secure-store";
import Realm from "realm";
import { AuthSchema } from "../utils/DbSchemas";
import {compareSync} from "bcrypt-ts";

export interface LoginProps {
  passcode: string;
  dispatch: Dispatch;
  user: AuthSchema;
  realm: Realm;
}

export async function SubmitLogin(props: LoginProps) {
  try {
    const isValid = compareSync(props.passcode, props.user.passwordHash);
    if (isValid) {
      props.dispatch({ type: "auth/authenticate" });
      await SecureStore.setItemAsync("passcode", props.user.passwordHash);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Error while submitting login:", e);
    return false;
  }
}
