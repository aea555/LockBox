import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { YStack, Text } from "tamagui";

type LooseCombinedObjects<T, U> = T & U;

interface SecretDatesProps {
  createdAt: Date,
  lastEdited: Date,
  inputStyle: StyleProp<LooseCombinedObjects<React.CSSProperties, TextStyle>>,
  fontStyle: StyleProp<LooseCombinedObjects<React.CSSProperties, TextStyle>>,
}


export default function SecretDates(props: SecretDatesProps) {
  return (
    <YStack>
      <Text style={props.inputStyle}>
        Created:{" "}
        <Text style={props.fontStyle}>
          {props.createdAt.toLocaleDateString()} {props.createdAt.toLocaleTimeString()}
        </Text>
      </Text>
      <Text style={props.inputStyle}>
        Last Updated:{" "}
        <Text style={props.fontStyle}>
          {props.lastEdited.toLocaleDateString()} {props.lastEdited.toLocaleTimeString()}
        </Text>
      </Text>
    </YStack>
  );
}
