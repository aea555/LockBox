import Realm from "realm";
import { AuthSchema } from "../utils/DbSchemas";
import { compareSync, hashSync } from "bcrypt-ts";

export interface ChangePasscodeProps {
  currentPasscode: string;
  newPasscode: string;
  realm: Realm;
  user: AuthSchema
};

export function ChangePasscode(props: ChangePasscodeProps) {
  try {
    const passwordValid = compareSync(props.currentPasscode, props.user.passwordHash);
    if (passwordValid){
      const newEncryptedPassword = hashSync(props.newPasscode, 6);
      if (newEncryptedPassword){
        props.realm.write(() => {
          (props.user.passwordHash = newEncryptedPassword)
        });
        console.log("Passcode change successful");
        return true;
      }
      else return false;
    }
    console.error("Password invalid.")
    return false;
  } catch (e) {
    console.error("Object update failed:", e);
    return false;
  }
}

