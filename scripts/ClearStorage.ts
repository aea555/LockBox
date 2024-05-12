import * as SecureStore from "expo-secure-store";

export default async function ClearStorage(){
  await SecureStore.deleteItemAsync("passcode");
}