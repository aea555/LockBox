import { Label, Switch, XStack } from "tamagui";
import { StyleSheet } from "react-native";

interface ComponentProps {
  checked: boolean,
  setChecked: React.Dispatch<React.SetStateAction<boolean>>,
  label?: string
  disabled?: boolean
};

export default function PasswordToggle(props: ComponentProps) {
  return (
    <XStack gap="$2" alignItems="center">
      <Switch
        id={`switch-password-${props.checked}`}
        size="$3"
        disabled={props.disabled}
        onCheckedChange={(c) => props.setChecked(c)}
      >
        <Switch.Thumb animation="quicker" />
      </Switch>
      <Label
        htmlFor={`switch-password-${props.checked}`}
        fontSize={"$5"}
        style={styles.pageFont}
      >
        {props.label ?? "Show Password"}
      </Label>
    </XStack>
  );
}

const styles = StyleSheet.create({
  pageFont: {
    fontFamily: "RedHatDisplay_900Black",
  }
});
