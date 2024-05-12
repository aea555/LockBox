import type { ReactNode } from "react";
import { AlertDialog, Button, XStack, YStack, Text } from "tamagui";

interface ConfirmationAlertProps {
  saveButtonLabel: string;
  title: string;
  desc: string;
  onPress?: () => void;
  button: ReactNode;
  inputs?: ReactNode;
}

export function ConfirmationAlert(props: ConfirmationAlertProps) {
  return (
    <AlertDialog native>
      <AlertDialog.Trigger asChild>{props.button}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title>{props.title}</AlertDialog.Title>

            <AlertDialog.Description>{props.desc}</AlertDialog.Description>
            <XStack space="$3" justifyContent="flex-end">
              <Button onPress={props.onPress} theme="active">
                {props.saveButtonLabel}
              </Button>
              <AlertDialog.Cancel asChild>
                <Button>Cancel</Button>
              </AlertDialog.Cancel>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
