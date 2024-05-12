import { Input, Label, XStack, YStack } from "tamagui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { ColorSchemeName } from "react-native/Libraries/Utilities/Appearance";

type LooseCombinedObjects<T, U> = T & U;

interface SecretFieldProps {
  label: string;
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  colorScheme: ColorSchemeName;
  toggle?: boolean;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  inputStyle: StyleProp<LooseCombinedObjects<React.CSSProperties, TextStyle>>;
  fontStyle: StyleProp<LooseCombinedObjects<React.CSSProperties, TextStyle>>;
  wrongInput?: boolean;
}

export default function SecretField(props: SecretFieldProps) {
  return (
    <YStack>
      <Label style={props.fontStyle}>{props.label}</Label>
      <XStack gap={"$5"} alignItems="center">
        <Input
          flex={1}
          disabled={props.toggle}
          style={props.inputStyle}
          value={props.value}
          onChangeText={(t) => props.setValue(t)}
          secureTextEntry={props.toggle}
          borderWidth={"$1"}
          borderColor={props.wrongInput ? "$red9" : "$black9"}
        />
        {props.toggle !== undefined && (
          <FontAwesome
            color={props.colorScheme === "dark" ? "white" : "black"}
            size={30}
            name={props.toggle ? "eye" : "eye-slash"}
            onPress={() =>
              props.setToggle ? props.setToggle(!props.toggle) : null
            }
          />
        )}
      </XStack>
    </YStack>
  );
}
