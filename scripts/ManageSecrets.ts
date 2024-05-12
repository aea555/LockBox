import Realm, { BSON } from "realm";
import { SecretSchema } from "../utils/DbSchemas";
import { EncryptString, DecryptString } from "../utils/AesCrypt";

export interface CreateSecretProps {
  name: string;
  site: string;
  email: string;
  password: string;
  realm: Realm;
}

export interface UpdateSecretProps {
  _id: BSON.ObjectId;
  name?: string;
  site?: string;
  email?: string;
  password?: string;
  secret: SecretSchema;
  realm: Realm;
}

export interface DeleteSecretProps {
  secret: SecretSchema;
  realm: Realm;
}

export function CreateSecret(props: CreateSecretProps) {
  try {
    const encrypted = EncryptString(props.password);
    props.realm.write(() => {
      props.realm.create(SecretSchema, {
        _id: new BSON.ObjectId(),
        name: props.name,
        site: props.site,
        email: props.email,
        passwordHash: encrypted,
        createdAt: new Date(),
        lastEdited: new Date(),
      });
    });

    return true;
  } catch (e) {
    console.log("Object creation failed:", e);
    return false;
  }
}

export function UpdateSecret(props: UpdateSecretProps) {
  try {
    const newEncryptedPassword = EncryptString(props.password);
    console.log("NEW SITE", props.site);
    props.realm.write(() => {
      (props.secret.site = props.site ?? props.secret.site),
      (props.secret.email = props.email ?? props.secret.email),
      (props.secret.passwordHash = newEncryptedPassword ?? props.secret.passwordHash),
      (props.secret.lastEdited = new Date());
    });
    return true;
  } catch (e) {
    console.error("Object update failed:", e);
    return false;
  }
}

export function DeleteSecret(props: DeleteSecretProps) {
  try {
    const secret = props.secret;
    if (secret) {
      props.realm.write(() => {
        props.realm.delete(secret);
      });
      return true;
    }
  } catch (e) {
    console.log("Object delete failed:", e);
    return false;
  }
}

export function RevealPassword(encryptedPassword: string) {
  try {
    return DecryptString(encryptedPassword);
  } catch (e) {
    console.log("Process failed:", e);
    return false;
  }
}
