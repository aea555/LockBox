import { Button, Spinner, Text, XStack, YStack } from "tamagui";
import { Image, StyleSheet } from "react-native";
import PasswordInput from "../../component/PasswordInput";
import PasswordToggle from "../../component/PasswordToggle";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "@expo-google-fonts/dev/useFonts";
import { RedHatDisplay_900Black } from "@expo-google-fonts/dev";
import {
  CreatePasscodeProps,
  SubmitNewPasscode,
} from "../../scripts/SubmitNewPasscode";
import { useRealm } from "@realm/react";

export default function CreatePasscode() {
  const dispatch = useDispatch();
  const router = useRouter();
  const realm = useRealm();
  const [passcode, setPasscode] = useState("");
  const [checked, setChecked] = useState(false);
  const [focused, setFocused] = useState(false);
  const [wrongInput, setWrongInput] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (passcode) {
      if (passcode.length < 4) setWrongInput(true);
      else setWrongInput(false);
    }
  }, [passcode]);

  let [fontsLoaded] = useFonts({
    RedHatDisplay_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  const props: CreatePasscodeProps = {
    dispatch,
    router,
    passcode,
    realm,
  };

  async function handlePress() {
    setLoading(true);
    await SubmitNewPasscode(props);
  }

  return (
    <YStack height={"100%"} padding="$5">
      <Image source={require("../../static/Lockbox.png")} />
      <YStack gap={"$2"}>
        <PasswordInput
          passcode={passcode}
          setPasscode={setPasscode}
          checked={checked}
          setFocused={setFocused}
          wrongInput={wrongInput}
          disabled={loading}
        />
        {wrongInput && !loading ? (
          <Text color={"red"} style={styles.pageFont}>
            Passcode must contain at least 4 characters.
          </Text>
        ) : null}
        {focused && !loading ? (
          <Text style={styles.pageFont}>
            Recommendation: Create a passcode containing only numbers between
            4-6 characters.
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
          label="Show Passcode"
          checked={checked}
          setChecked={setChecked}
          disabled={loading}
        />
      </YStack>
      <YStack gap={"$1"}>
        <Button
          onPress={handlePress}
          style={[
            styles.button,
            wrongInput || loading ? { backgroundColor: "grey" } : null,
          ]}
          disabled={wrongInput || loading}
        >
          <Text color={"white"} fontSize={"$7"} style={styles.pageFont}>
            Create Passcode
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