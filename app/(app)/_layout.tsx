import { Stack } from "expo-router";
import { RealmProvider } from "@realm/react";
import { AuthSchema, SecretSchema } from "../../utils/DbSchemas";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  );
}
