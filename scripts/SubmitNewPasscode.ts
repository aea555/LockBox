import "react-native-get-random-values";
import { Dispatch } from "redux";
import * as SecureStore from "expo-secure-store";
import { Router } from "expo-router/build/types";
import Realm, { BSON } from "realm";
import { AuthSchema } from "../utils/DbSchemas";
import {hash} from "bcrypt-ts";

export interface CreatePasscodeProps {
  passcode: string;
  dispatch: Dispatch;
  router: Router;
  realm: Realm;
}

export async function SubmitNewPasscode(props: CreatePasscodeProps) {
  const hashedPassword = await hash(props.passcode, 6);

  props.realm.write(() => {
    props.realm.create(AuthSchema, {
      _id: new BSON.ObjectId(),
      passwordHash: hashedPassword,
    });
  });

  props.dispatch({type: "auth/authenticate"});
  props.dispatch({type: "auth/savePasscode", payload: {passcode: hashedPassword}});
  await SecureStore.setItemAsync("passcode", hashedPassword);
  props.router.replace("/");
}
