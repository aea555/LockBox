import * as SecureStorage from "expo-secure-store";
import CryptoES from "crypto-es";
export interface KeyCheckResponse {
  success: boolean;
  key: string;
  message?: string;
}

export function CheckForLocalRealmEncyptionKey(): KeyCheckResponse {
  try {
    const key = SecureStorage.getItem("realm-key");
    if (key) {
      const returnObj: KeyCheckResponse = {
        success: true,
        key: key,
        message: "Local encryption key found.",
      };
      console.log(returnObj.message);
      return returnObj;
    } else {
      const returnObj: KeyCheckResponse = {
        success: false,
        key: "",
        message: "Local encryption key not found.",
      };
      console.log(returnObj.message);
      return returnObj;
    }
  } catch (e) {
    const returnObj: KeyCheckResponse = {
      success: false,
      key: "",
      message: `Unexpected error: ${e}`,
    };
    console.log(returnObj.message);
    return returnObj;
  }
}

export function CheckForLocalPassPhrase(): KeyCheckResponse {
  try {
    const key = SecureStorage.getItem("passphrase");
    if (key) {
      const returnObj: KeyCheckResponse = {
        success: true,
        key: key,
        message: "Local passphrase found.",
      };
      console.log(returnObj.message);
      return returnObj;
    } else {
      const returnObj: KeyCheckResponse = {
        success: false,
        key: "",
        message: "Local passphrase not found.",
      };
      console.log(returnObj.message);
      return returnObj;
    }
  } catch (e) {
    const returnObj: KeyCheckResponse = {
      success: false,
      key: "",
      message: `Unexpected error: ${e}`,
    };
    console.log(returnObj.message);
    return returnObj;
  }
}

export function SaveRealmEncryptionKey(
  key: string
): KeyCheckResponse {
  try {
    if (key) {
      SecureStorage.setItem("realm-key", key);
      const returnObj: KeyCheckResponse = {
        success: true,
        key: key,
        message: "Encryption key saved.",
      };
      console.log(returnObj.message);
      return returnObj;
    } else {
      const returnObj: KeyCheckResponse = {
        success: false,
        key: "",
        message: "Key not provided.",
      };
      console.log(returnObj.message);
      return returnObj;
    }
  } catch (e) {
    const returnObj: KeyCheckResponse = {
      success: false,
      key: "",
      message: `Unexpected error: ${e}`,
    }
    console.log(returnObj.message);
    return returnObj;
  }
}

export function SavePassPhrase(key: string): KeyCheckResponse {
  try {
    if (key) {
      SecureStorage.setItem("passphrase", key);
      const returnObj: KeyCheckResponse = {
        success: true,
        key: key,
        message: "Passphrase saved.",
      };
      console.log(returnObj.message);
      return returnObj;
    } else {
      const returnObj: KeyCheckResponse = {
        success: false,
        key: "",
        message: "Passphrase not provided.",
      };
      console.log(returnObj.message);
      return returnObj;
    }
  } catch (e) {
    const returnObj: KeyCheckResponse = {
      success: false,
      key: "",
      message: `Unexpected error: ${e}`,
    };
    console.log(returnObj.message);
    return returnObj;
  }
}

export function GenerateRandomEncryptionKey(length: number): KeyCheckResponse {
  try {
    if (!length) {
      const returnObj: KeyCheckResponse = {
        success: false,
        key: "",
        message: "Length not provided.",
      };
      console.log(returnObj.message);
      return returnObj;
    } else {
      const key = CryptoES.lib.WordArray.random(length);
      const salt = CryptoES.lib.WordArray.random(16);
      const derivedKey = CryptoES.PBKDF2(key, salt, {
        keySize: 256 / 32,
        iterations: 10000,
      });
      SaveRealmEncryptionKey(derivedKey.toString());
      const returnObj: KeyCheckResponse = {
        success: true,
        message: "Encryption key generated.",
        key: derivedKey.toString(),
      };
      console.log(returnObj.message);
      return returnObj;
    }
  } catch (e) {
    const returnObj: KeyCheckResponse = {
      success: false,
      key: "",
      message: `Unexpected error: ${e}`,
    };
    console.log(returnObj.message);
    return returnObj;
  }
}

export function GenerateRandomPassphrase(): KeyCheckResponse {
  try {
    const passphraseLength = 24;
    const passphrase =
      CryptoES.lib.WordArray.random(passphraseLength).toString();
    SavePassPhrase(passphrase);
    const returnObj: KeyCheckResponse = {
      success: true,
      key: passphrase,
      message: "Passphrase generation successful.",
    };
    console.log(returnObj.message);
    return returnObj;
  } catch (e) {
    const returnObj: KeyCheckResponse = {
      success: false,
      key: "",
      message: `Unexpected error: ${e}`,
    };
    console.log(returnObj.message);
    return returnObj;
  }
}
