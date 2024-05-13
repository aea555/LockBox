import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot } from "expo-router";
import { ActivityIndicator, useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../config/tamagui.config";
import { Provider, useSelector } from "react-redux";
import store from "../utils/store";
import { RealmProvider } from "@realm/react";
import { AuthSchema, SecretSchema } from "../utils/DbSchemas";
import { useEffect, useState } from "react";
import {
  CheckForLocalPassPhrase,
  CheckForLocalRealmEncyptionKey,
  GenerateRandomEncryptionKey,
  GenerateRandomPassphrase,
  SavePassPhrase,
  SaveRealmEncryptionKey,
} from "../utils/Security";
import TextEncoding from "text-encoding";
import * as FileSystem from "expo-file-system";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [EncryptionKey, setEncryptionKey] = useState("");
  const [RealmPath, setRealmPath] = useState("");

  useEffect(() => {
    async function fetchData() {
      const encKey = CheckForLocalRealmEncyptionKey();
      if (encKey.success && encKey.key) {
        setEncryptionKey(encKey.key);
      } else {
        const newKey = GenerateRandomEncryptionKey(64);
        if (newKey.success && newKey.key) {
          setEncryptionKey(newKey.key);
          SaveRealmEncryptionKey(newKey.key);
        }
      }

      const passPhrase = CheckForLocalPassPhrase();
      if (!(passPhrase.success && passPhrase.key)) {
        const newPassPhrase = GenerateRandomPassphrase();
        if (newPassPhrase.success && newPassPhrase.key) {
          SavePassPhrase(newPassPhrase.key);
        }
      }

      const directoryPath = `${FileSystem.documentDirectory}`;

      const { exists, isDirectory } = await FileSystem.getInfoAsync(
        directoryPath
      );

      if (isDirectory && !exists) {
        await FileSystem.makeDirectoryAsync(directoryPath, {
          intermediates: true,
        });
        const realmPath = "lockbox.realm";
        setRealmPath(realmPath);
      } else {
        const realmPath = "lockbox.realm";
        setRealmPath(realmPath);
      }
    }

    fetchData();
  }, []);

  return (
    <Provider store={store}>
      {RealmPath && EncryptionKey ? (
        <RealmProvider
          encryptionKey={
            new TextEncoding.TextEncoder().encode(EncryptionKey).buffer
          }
          schema={[SecretSchema, AuthSchema]}
          path={RealmPath}
          schemaVersion={7}
        >
          <TamaguiProvider
            config={tamaguiConfig}
            defaultTheme={colorScheme?.toString()}
          >
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Slot />
            </ThemeProvider>
          </TamaguiProvider>
        </RealmProvider>
      ) : (
        <ActivityIndicator size={"large"} color={"darkorchid"} />
      )}
    </Provider>
  );
}
