import { Input, Label, Text } from "tamagui";
import { StyleSheet } from "react-native";

interface ComponentProps {
  passcode: string;
  setPasscode: React.Dispatch<React.SetStateAction<string>>;
  checked: boolean;
  setFocused?: React.Dispatch<React.SetStateAction<boolean>>
  wrongInput?: boolean
  disabled?: boolean
}

export default function PasswordInput(props: ComponentProps) {
  return (
    <>
      <Label style={styles.pageFont} fontSize={"$7"}>
        Passcode
      </Label>
      <Input
        value={props.passcode}
        onChangeText={(text) => props.setPasscode(text)}
        borderWidth="$1"
        inputMode="text"
        secureTextEntry={!props.checked}
        onFocus={() => props.setFocused ? props.setFocused(true) : null}
        onBlur={() => props.setFocused ? props.setFocused(false) : null}
        maxLength={6}
        borderColor={props.wrongInput ? "$red9" : "$black9"}
      />
    </>
  );
}

const styles = StyleSheet.create({
  pageFont: {
    fontFamily: "RedHatDisplay_900Black",
  },
});
