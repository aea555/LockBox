import { Modal, StyleProp, TextStyle } from "react-native";
import { View, Text, Button, YStack, XStack } from "tamagui";

type LooseCombinedObjects<T, U> = T & U;

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  fontStyle?: StyleProp<LooseCombinedObjects<React.CSSProperties, TextStyle>>;
  confirmationText?: string;
  label: string;
  onPress?: () => void;
  closeText: string;
}

export default function ConfirmationModal(props: ModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <View alignSelf="center" marginTop="auto" marginBottom="auto">
        <View
          padding="$4"
          backgroundColor="$blue10"
          borderRadius={"$4"}
        >
          <YStack gap="$4">
            <Text style={props.fontStyle}>{props.confirmationText}</Text>
            <XStack gap="$4" justifyContent="flex-end">
              <Button
                onPress={() => props.setModalVisible(!props.modalVisible)}
                chromeless
              >
                <Text style={props.fontStyle}>{props.closeText}</Text>
              </Button>
              <Button onPress={props.onPress} backgroundColor={"$accentBackground"}>
                <Text style={props.fontStyle}>{props.label}</Text>
              </Button>
            </XStack>
          </YStack>
        </View>
      </View>
    </Modal>
  );
}
