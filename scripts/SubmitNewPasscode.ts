import "react-native-get-random-values";
import { Dispatch } from "redux";
import * as SecureStore from "expo-secure-store";
import Realm, { BSON } from "realm";
import { AuthSchema } from "../utils/DbSchemas";
import { hash } from "bcrypt-ts";

export interface CreatePasscodeProps {
  passcode: string;
  dispatch: Dispatch;
  realm: Realm;
}

export async function SubmitNewPasscode(
  props: CreatePasscodeProps
): Promise<boolean> {
  try {
    const hashedPassword = await hash(props.passcode, 6);
    if (hashedPassword) {
      props.realm.write(() => {
        props.realm.create(AuthSchema, {
          _id: new BSON.ObjectId(),
          passwordHash: hashedPassword,
        });
      });
      props.dispatch({ type: "auth/authenticate" });
      props.dispatch({
        type: "auth/savePasscode",
        payload: { passcode: hashedPassword },
      });
      await SecureStore.setItemAsync("passcode", hashedPassword);
      return true;
    }
    console.error("Passcode not provided.");
    return false;
  } catch (e) {
    console.error("Passcode creation failed, reason:", e);
    return false;
  }
}
