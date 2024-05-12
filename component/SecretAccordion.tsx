import { Accordion, Button, Paragraph, Square, Text, YStack } from "tamagui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useColorScheme, StyleSheet } from "react-native";
import { useState } from "react";
import SecretField from "./SecretField";
import SecretDates from "./SecretDates";
import { SecretSchema } from "../utils/DbSchemas";
import {
  DeleteSecret,
  DeleteSecretProps,
  UpdateSecret,
  UpdateSecretProps,
} from "../scripts/ManageSecrets";
import Realm from "realm";
import Loading from "./Loading";
import { useRouter } from "expo-router";
import ConfirmationModal from "./ConfirmationModal";
import { DecryptString } from "../utils/AesCrypt";

interface SecretAccordionProps {
  secret: SecretSchema;
  realm: Realm;
}

export default function SecretAccordion(props: SecretAccordionProps) {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [secret, setSecret] = useState(props.secret);
  const [name, setName] = useState(props.secret.name);
  const [site, setSite] = useState(props.secret.site);
  const [email, setEmail] = useState(props.secret.email);
  const [password, setPassword] = useState(DecryptString(props.secret.passwordHash));
  const [createdAt, setCreatedAt] = useState(props.secret.createdAt);
  const [lastEdited, setLastEdited] = useState(props.secret.lastEdited);
  const [siteToggle, setSiteToggle] = useState(true);
  const [emailToggle, setEmailToggle] = useState(true);
  const [passwordToggle, setPasswordToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const updateProps: UpdateSecretProps = {
    _id: secret._id,
    name,
    site,
    email,
    password,
    secret,
    realm: props.realm,
  };

  const deleteProps: DeleteSecretProps = {
    realm: props.realm,
    secret: props.secret,
  };

  function Update() {
    setLoading(true);
    UpdateSecret(updateProps);
    setLoading(false);
    setUpdateModalVisible(false);
    router.push("/");
  }

  function Delete() {
    setLoading(true);
    DeleteSecret(deleteProps);
    setLoading(false);
    setDeleteModalVisible(false);
    router.push("/");
  }

  return (
    <Accordion overflow="hidden" width="100%" type="multiple">
      <Accordion.Item value="a1">
        <Accordion.Trigger flexDirection="row" justifyContent="space-between">
          {({ open }: { open: boolean }) => (
            <>
              <Paragraph style={styles.pageFont}>{name}</Paragraph>
              <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                <FontAwesome
                  color={colorScheme === "dark" ? "white" : "black"}
                  size={20}
                  name="chevron-down"
                />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.Content
          paddingTop={0}
          animation="medium"
          exitStyle={{ opacity: 0 }}
        >
          {loading ? (
            <Loading fontStyle={styles.pageFont} />
          ) : (
            <YStack gap="$5">
              <SecretField
                label="Website Address"
                value={site}
                setValue={setSite}
                colorScheme={colorScheme}
                toggle={siteToggle}
                setToggle={setSiteToggle}
                inputStyle={styles.inputFont}
                fontStyle={styles.pageFont}
              />
              <SecretField
                label="Email"
                value={email}
                setValue={setEmail}
                colorScheme={colorScheme}
                toggle={emailToggle}
                setToggle={setEmailToggle}
                inputStyle={styles.inputFont}
                fontStyle={styles.pageFont}
              />
              <SecretField
                label="Password"
                value={password}
                setValue={setPassword}
                toggle={passwordToggle}
                setToggle={setPasswordToggle}
                colorScheme={colorScheme}
                inputStyle={styles.inputFont}
                fontStyle={styles.pageFont}
              />
              <YStack>
                <ConfirmationModal
                  modalVisible={updateModalVisible}
                  setModalVisible={setUpdateModalVisible}
                  confirmationText="Are you sure that you want to update this secret?"
                  fontStyle={styles.pageFont}
                  label="Update"
                  onPress={Update}
                />
                <Button
                  backgroundColor={"darkorchid"}
                  onPress={() => setUpdateModalVisible(!updateModalVisible)}
                >
                  <Text style={styles.pageFont}>Update</Text>
                </Button>
              </YStack>
              <SecretDates
                inputStyle={styles.inputFont}
                fontStyle={styles.pageFont}
                createdAt={createdAt}
                lastEdited={lastEdited}
              />
              <YStack>
                <ConfirmationModal
                  modalVisible={deleteModalVisible}
                  setModalVisible={setDeleteModalVisible}
                  confirmationText="Are you sure that you want to delete this secret?"
                  fontStyle={styles.pageFont}
                  label="Delete"
                  onPress={Delete}
                />
                <Button
                  backgroundColor="$red9"
                  onPress={() => setDeleteModalVisible(!deleteModalVisible)}
                >
                  <Text style={styles.pageFont}>Delete</Text>
                </Button>
              </YStack>
            </YStack>
          )}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}

const styles = StyleSheet.create({
  pageFont: {
    fontFamily: "RedHatDisplay_900Black",
  },
  inputFont: {
    fontFamily: "RedHatDisplay_400Regular",
  },
  buttonDisabled: {
    backgroundColor: "red",
  },
});
