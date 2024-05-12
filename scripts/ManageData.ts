import { Results } from "realm/dist/public-types/Results";
import { SecretSchema } from "../utils/DbSchemas";
import Realm from "realm";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import * as MediaLibrary from "expo-media-library";
import { BSON } from "realm";

interface SecretObject {
  _id: string;
  name: string;
  site: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  lastEdited: string;
}

export async function ImportJson(realm: Realm, secrets: Results<SecretSchema>) {
  try {
    const file = await DocumentPicker.getDocumentAsync({
      type: "application/json",
      multiple: false,
    });

    if (!file.canceled) {
      const fileContent = await FileSystem.readAsStringAsync(
        file.assets[0].uri,
        { encoding: FileSystem.EncodingType.UTF8 }
      );
      const secretsJson = JSON.parse(fileContent) as SecretObject[];
      const uniqueSecrets = secretsJson.map((s) => {
        if (!secrets.find((sec) => sec._id.toHexString() === s._id)) {
          return s;
        }
      });
      uniqueSecrets.forEach((s) => {
        if (s) {
          realm.write(() => {
            realm.create(SecretSchema, {
              _id: BSON.ObjectId.createFromHexString(s._id),
              name: s.name,
              site: s.site,
              email: s.email,
              passwordHash: s.passwordHash,
              createdAt: new Date(s.createdAt),
              lastEdited: new Date(s.lastEdited),
            });
          });
        }
      });
      return true;
    } else {
      console.log("Import canceled.");
      return false;
    }
  } catch (error) {
    console.error("Error importing JSON:", error);
    return false;
  }
}

export async function ExportJson(realm: Realm, secrets: Results<SecretSchema>) {
  try {
    const secretsArray: SecretObject[] = secrets.map((secret) => ({
      _id: secret._id.toHexString(),
      name: secret.name,
      site: secret.site,
      email: secret.email,
      passwordHash: secret.passwordHash,
      createdAt: secret.createdAt.toISOString(),
      lastEdited: secret.lastEdited.toISOString(),
    }));

    const jsonContent = JSON.stringify(secretsArray, null, 2);

    const fileUri = `${
      FileSystem.cacheDirectory
    }secrets_${new Date().toISOString()}`;

    const perm =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!perm.granted) {
      console.log("permission denied");
      return false;
    }

    const uri = perm.directoryUri;

    const res = await FileSystem.StorageAccessFramework.createFileAsync(
      uri,
      fileUri,
      "application/json"
    );

    await FileSystem.writeAsStringAsync(res, jsonContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    await FileSystem.deleteAsync(fileUri, { idempotent: true });
    return true;
  } catch (e) {
    console.error("Exporting to json failed, reason:", e);
    return false;
  }
}
