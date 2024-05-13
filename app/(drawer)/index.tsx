import { YStack, Button, Text, ScrollView } from "tamagui";
import SecretAccordion from "../../component/SecretAccordion";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SecretSchema } from "../../utils/DbSchemas";
import { useQuery, useRealm } from "@realm/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectLanguageCode } from "../../utils/authSlice";
import { getLocalizedString } from "../../localization/localization";

export default function Tab() {
  const router = useRouter();
  const realm = useRealm();
  const [secrets, setSecrets] = useState(useQuery({ type: SecretSchema })); 
  const langCode = useSelector(selectLanguageCode);

  return (
    <ScrollView>
      <YStack
        paddingHorizontal="$6"
        paddingVertical="$3"
        alignItems="center"
        gap="$4"
      >
        <Button
          onPress={() => router.push("/newsecret")}
          style={styles.button}
          bordered
          alignSelf="flex-start"
          alignItems="center"
        >
          <Text style={styles.pageFont}>{getLocalizedString("CREATE_NEW", langCode)}</Text>
          <FontAwesome size={20} name="plus-circle" />
        </Button>        
        {secrets.map((s) => {
          return (
            <SecretAccordion
              key={s._id.toString()}
              secret={s}
              realm={realm}
              websiteAddressText={getLocalizedString("WEBSITE_ADDRESS", langCode)}
              passwordText={getLocalizedString("PASSWORD", langCode)}
              emailAddressText={getLocalizedString("EMAIL_ADDRESS", langCode)}
              deleteConfirmationText={getLocalizedString("DELETE_CONFIRMATION", langCode)}
              deleteText={getLocalizedString("DELETE", langCode)}
              updateConfirmationText={getLocalizedString("UPDATE_CONFIRMATION", langCode)}
              updateText={getLocalizedString("UPDATE", langCode)}
              createdAtText={getLocalizedString("CREATED_AT", langCode)}
              lastUpdatedText={getLocalizedString("UPDATED_AT", langCode)}
              closeText={getLocalizedString("CLOSE", langCode)}
              loadingText={getLocalizedString("LOADING_TEXT", langCode)}
            />
          );
        })}
      </YStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageFont: {
    fontFamily: "RedHatDisplay_900Black",
  },
  button: {
    backgroundColor: "darkorchid",
  },
});
