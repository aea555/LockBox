import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { XStack, Text, Spinner } from "tamagui";

type LooseCombinedObjects<T, U> = T & U;

interface LoadingProps {
  fontStyle?: StyleProp<LooseCombinedObjects<React.CSSProperties, TextStyle>>
  text: string;
}

export default function Loading(props: LoadingProps) {
  return (
    <XStack alignItems="center" gap="$3">
      <Text fontSize="$7" style={props.fontStyle}>
        {props.text}
      </Text>
      <Spinner size="large" color="$purple10" />
    </XStack>
  );
}
