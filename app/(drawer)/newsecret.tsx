import React, { useEffect, useState } from "react";
import { Button, Input, Label, YStack, Text, ScrollView } from "tamagui";
import SecretField from "../../component/SecretField";
import { useColorScheme, StyleSheet } from "react-native";
import { isURL, isEmail } from "validator";
import { CreateSecret, CreateSecretProps } from "../../scripts/ManageSecrets";
import { useRealm } from "@realm/react";
import { useRouter } from "expo-router";

export default function Newsecret() {
  const colorScheme = useColorScheme();
  const realm = useRealm();
  const router = useRouter();
  const [name, setName] = useState("");
  const [site, setSite] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      name.length > 0 &&
      isURL(site) &&
      isEmail(email) &&
      password.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, site, password, email]);

  const props: CreateSecretProps = {
    name,
    site,
    email,
    password,
    realm,
  };

  function handlePress() {
    CreateSecret(props);
    router.push("/");
  }

  return (
    <ScrollView>
      <YStack paddingHorizontal="$8" paddingVertical="$3" gap="$4">
        <YStack>
          <Label style={styles.pageFont}>Name</Label>
          <Input
            inputMode="text"
            value={name}
            onChangeText={(t) => setName(t)}
          />
        </YStack>

        <SecretField
          label="Site"
          value={site}
          setValue={setSite}
          colorScheme={colorScheme}
          inputStyle={styles.inputFont}
          fontStyle={styles.pageFont}
          wrongInput={!isURL(site)}
        />
        <SecretField
          label="Email"
          value={email}
          setValue={setEmail}
          colorScheme={colorScheme}
          inputStyle={styles.inputFont}
          fontStyle={styles.pageFont}
          wrongInput={!isEmail(email)}
        />
        <SecretField
          label="Password"
          value={password}
          setValue={setPassword}
          colorScheme={colorScheme}
          inputStyle={styles.inputFont}
          fontStyle={styles.pageFont}
          toggle={toggle}
          setToggle={setToggle}
        />
        <Button
          onPress={handlePress}
          style={[styles.button, disabled ? { backgroundColor: "grey" } : null]}
          bordered
          alignSelf="flex-start"
          alignItems="center"
          disabled={disabled}
        >
          <Text style={styles.pageFont}>Submit</Text>
        </Button>
      </YStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageFont: {
    fontFamily: "RedHatDisplay_900Black",
  },
  inputFont: {
    fontFamily: "RedHatDisplay_400Regular",
  },
  button: {
    backgroundColor: "darkorchid",
  },
});
