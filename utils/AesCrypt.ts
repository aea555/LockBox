import CryptoES from "crypto-es";
import CryptoJS from "crypto-js";
import { CheckForLocalPassPhrase, GenerateRandomPassphrase } from "./Security";
import * as SecureStore from "expo-secure-store";

export function EncryptString(plaintext: string | undefined): string {
  try {
    const passPhrase = SecureStore.getItem("passphrase");
    if (plaintext && passPhrase) {
      const encrypted = CryptoES.AES.encrypt(plaintext, passPhrase).toString();
      return encrypted;
    } else {
      console.error("Plaintext not provided.");
      return "";
    }
  } catch (error) {
    console.error(`Plaintext encryption failed:, ${error}`);
    return "";
  }
}

export function DecryptString(cipherText: string | undefined): string {
  try {
    const passPhrase = SecureStore.getItem("passphrase");
    if (cipherText && passPhrase) {
      const decrypted = CryptoJS.AES.decrypt(cipherText, passPhrase).toString(
        CryptoJS.enc.Utf8
      );
      return decrypted;
    } else {
      console.error("Ciphertext not provided.");
      return "";
    }
  } catch (error) {
    console.error(`Ciphertext decryption failed:, ${error}`);
    return "";
  }
}
