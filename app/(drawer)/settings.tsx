import { StyleSheet, useColorScheme } from "react-native";
import { ListItem, XStack, YStack, Text, Button, ScrollView } from "tamagui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";

import ClearStorage from "../../scripts/ClearStorage";
import {
  RedHatDisplay_400Regular,
  RedHatDisplay_900Black,
  useFonts,
} from "@expo-google-fonts/dev";
import { useState } from "react";
import {
  ChangePasscode,
  ChangePasscodeProps,
} from "../../scripts/ChangePasscode";
import { useQuery, useRealm } from "@realm/react";
import { AuthSchema, SecretSchema } from "../../utils/DbSchemas";
import SecretField from "../../component/SecretField";
import { CustomDialog } from "../../component/CustomDialog";
import Loading from "../../component/Loading";
import { ExportJson, ImportJson } from "../../scripts/ManageData";
import { getLocalizedString } from "../../localization/localization";
import { selectLanguageCode } from "../../utils/authSlice";

export default function Tab() {
  const dispatch = useDispatch();
  const router = useRouter();
  const realm = useRealm();
  const user = useQuery({ type: AuthSchema })[0];
  const secrets = useQuery({ type: SecretSchema });
  const colorScheme = useColorScheme();
  const [currentPasscode, setCurrentPasscode] = useState("");
  const [newPasscode, setNewPasscode] = useState("");
  const [curPasscodeChecked, setCurPasscodeChecked] = useState(false);
  const [newPasscodeChecked, setNewPasscodeChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const langCode = useSelector(selectLanguageCode);

  let [fontsLoaded] = useFonts({
    RedHatDisplay_900Black,
    RedHatDisplay_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const props: ChangePasscodeProps = {
    currentPasscode,
    newPasscode,
    realm,
    user,
  };

  async function LogOut() {
    await ClearStorage();
    dispatch({ type: "auth/removeAuth" });
    dispatch({ type: "auth/removePasscode" });
    router.replace("/login");
  }

  function handleChangePasscode() {
    try {
      setLoading(true);
      const res = ChangePasscode(props);
      if (res) {
        setLoading(false);
        setNewPasscode("");
        setCurrentPasscode("");
        router.push("/");
        return;
      } else {
        console.error("something went wrong");
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const changePasscodeNode = (
    <Text fontSize="$5" style={styles.pageFont}>
      {getLocalizedString("CHANGE_PASSCODE", langCode)}
    </Text>
  );

  const saveButton = (
    <Button onPress={handleChangePasscode} backgroundColor={"darkorchid"}>
      <Text fontSize="$5" style={styles.pageFont}>
        {getLocalizedString("SUBMIT", langCode)}
      </Text>
    </Button>
  );

  const inputs = (
    <YStack gap="$5">
      <SecretField
        label={getLocalizedString("CURRENT_PASSCODE", langCode)}
        value={currentPasscode}
        setValue={setCurrentPasscode}
        colorScheme={colorScheme}
        toggle={curPasscodeChecked}
        setToggle={setCurPasscodeChecked}
        fontStyle={styles.pageFont}
        inputStyle={styles.pageFontLight}
      />
      <SecretField
        label={getLocalizedString("NEW_PASSCODE", langCode)}
        value={newPasscode}
        setValue={setNewPasscode}
        colorScheme={colorScheme}
        toggle={newPasscodeChecked}
        setToggle={setNewPasscodeChecked}
        fontStyle={styles.pageFont}
        inputStyle={styles.pageFontLight}
      />
      {loading ? <Loading text={getLocalizedString("LOADING_TEXT", langCode)} fontStyle={styles.pageFont} /> : null}
    </YStack>
  );

  return (
    <ScrollView>
      <XStack padding="$2" paddingVertical="$3">
        <YStack flex={1} gap="$3" padding="$3">
          <ListItem
            children={
              <CustomDialog
                button={changePasscodeNode}
                desc={getLocalizedString("PASSCODE_RECOMMENDATION", langCode)}
                onPress={handleChangePasscode}
                saveButton={saveButton}
                title={getLocalizedString("CHANGE_PASSCODE", langCode)}
                inputs={inputs}
                fontStyle={styles.pageFont}
              />
            }
            justifyContent="flex-start"
            hoverTheme
            bordered
            borderRadius={"$3"}
            icon={<FontAwesome size={28} name="sliders" />}
            fontWeight={"bold"}
            size={"$5"}
          />
          <ListItem
            children={
              <Text fontSize="$5" style={styles.pageFont}>
                {getLocalizedString("IMPORT_DATA", langCode)}
              </Text>
            }
            justifyContent="flex-start"
            hoverTheme
            bordered
            borderRadius={"$3"}
            icon={<FontAwesome size={28} name="inbox" />}
            fontWeight={"bold"}
            size={"$5"}
            onPress={() => ImportJson(realm, secrets)}
          />
          <ListItem
            children={
              <Text fontSize="$5" style={styles.pageFont}>
                {getLocalizedString("EXPORT_DATA", langCode)}
              </Text>
            }
            justifyContent="flex-start"
            hoverTheme
            bordered
            borderRadius={"$3"}
            icon={<FontAwesome size={28} name="send" />}
            fontWeight={"bold"}
            size={"$5"}
            onPress={() => ExportJson(realm, secrets)}
          />
          <ListItem
            children={
              <Text fontSize="$5" style={styles.pageFont}>
                {getLocalizedString("SIGN_OUT", langCode)}
              </Text>
            }
            justifyContent="flex-start"
            color={"red"}
            hoverTheme
            bordered
            borderRadius={"$3"}
            icon={<FontAwesome size={28} name="sign-out" />}
            fontWeight={"bold"}
            size={"$5"}
            onPress={LogOut}
          />
        </YStack>
      </XStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageFont: {
    fontFamily: "RedHatDisplay_900Black",
  },
  pageFontLight: {
    fontFamily: "RedHatDisplay_400Regular",
  },
});
