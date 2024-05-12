import { useRouter } from "expo-router";
import { useState, useCallback, useEffect } from "react";
import { Image, StyleSheet, useColorScheme } from "react-native";
import { Button, Spinner, Text, XStack, YStack } from "tamagui";
import { useDispatch } from "react-redux";
import { useFonts, RedHatDisplay_900Black } from "@expo-google-fonts/dev";
import PasswordToggle from "../../component/PasswordToggle";
import PasswordInput from "../../component/PasswordInput";
import { LoginProps, SubmitLogin } from "../../scripts/SubmitLogin";
import { useQuery, useRealm } from "@realm/react";
import { AuthSchema } from "../../utils/DbSchemas";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const realm = useRealm();
  const user = useQuery({ type: AuthSchema })[0];
  const [passcode, setPasscode] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [badRequest, setBadRequest] = useState(false);

  let [fontsLoaded] = useFonts({
    RedHatDisplay_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  const props: LoginProps = {
    passcode,
    dispatch,
    user,
    realm,
  };

  async function handleButtonPress() {
    setBadRequest(false);
    setLoading(true);
    const res = await SubmitLogin(props);
    if (!res) {
      setLoading(false);
      setBadRequest(true);
    } else {
      router.replace("/");
    }
  }

  return (
    <YStack height={"100%"} padding="$5">
      <Image source={require("../../static/Lockbox.png")} />
      <YStack gap={"$1"}>
        <PasswordInput
          passcode={passcode}
          setPasscode={setPasscode}
          checked={checked}
          disabled={loading}
          wrongInput={badRequest}
        />
        {badRequest ? (
          <Text fontSize="$7" color={"red"} style={styles.pageFont}>
            Invalid passcode.
          </Text>
        ) : null}
        {loading ? (
          <XStack alignItems="center" gap="$3">
            <Text fontSize="$7" style={styles.pageFont}>
              Please wait as your request is processed...
            </Text>
            <Spinner size="large" color="$purple10" />
          </XStack>
        ) : null}
        <PasswordToggle
          checked={checked}
          setChecked={setChecked}
          disabled={loading}
        />
      </YStack>
      <YStack gap={"$1"}>
        <Button
          disabled={loading}
          onPress={handleButtonPress}
          style={[styles.button, loading ? { backgroundColor: "grey" } : null]}
        >
          <Text color={"white"} fontSize={"$7"} style={styles.pageFont}>
            Login
          </Text>
        </Button>
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  pageFont: {
    fontFamily: "RedHatDisplay_900Black",
  },
  container: {
    padding: 12,
    marginTop: "auto",
    marginBottom: "auto",
  },
  verticallySpaced: {
    paddingVertical: 6,
    alignSelf: "stretch",
  },
  buttonContainer: {
    paddingVertical: 4,
    display: "flex",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "darkorchid",
    marginTop: 4,
  },
});
