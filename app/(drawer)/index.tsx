import { YStack, Button, XStack, Text, ScrollView } from "tamagui";
import SecretAccordion from "../../component/SecretAccordion";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SecretSchema } from "../../utils/DbSchemas";
import { useQuery, useRealm } from "@realm/react";
import { DecryptString } from "../../utils/AesCrypt";
import { useEffect, useState } from "react";
import { CollectionChangeCallback, CollectionChangeSet, Results } from "realm";

export default function Tab() {
  const router = useRouter();
  const realm = useRealm();
  const [secrets, setSecrets] = useState(useQuery({ type: SecretSchema })); 
  
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
          <Text style={styles.pageFont}>Create New</Text>
          <FontAwesome size={20} name="plus-circle" />
        </Button>        
        {secrets.map((s) => {
          return (
            <SecretAccordion
              key={s._id.toString()}
              secret={s}
              realm={realm}
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
