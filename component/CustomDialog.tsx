import type { ReactNode } from "react";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {
  Adapt,
  Dialog,
  Button,
  Sheet,
  XStack,
  Unspaced,
} from "tamagui";

type LooseCombinedObjects<T, U> = T & U;

interface CustomDialogProps {
  saveButtonLabel?: string;
  saveButton?: ReactNode;
  title: string;
  desc: string;
  onPress?: () => void;
  button: ReactNode;
  inputs?: ReactNode;
  fontStyle?: StyleProp<LooseCombinedObjects<React.CSSProperties, TextStyle>>;
}

export function CustomDialog(props: CustomDialogProps) {
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        {props.button}
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title style={props.fontStyle}>{props.title}</Dialog.Title>
          <Dialog.Description style={props.fontStyle}>
            {props.desc}
          </Dialog.Description>
          {props.inputs}
          <XStack alignSelf="flex-start" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              {props.saveButton}
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
