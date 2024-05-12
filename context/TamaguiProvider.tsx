import { ReactNode } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { TamaguiProvider as TamaguiProviderReal } from "@tamagui/core";
import { tamaguiConfig } from "../config/tamagui.config";
import { ToastProvider } from "@tamagui/toast";
import { PortalProvider } from "tamagui";

export default function TamaguiProvider(props: { children: ReactNode }) {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProviderReal
      config={tamaguiConfig}
      defaultTheme={colorScheme === "dark" ? "dark" : "light"}
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <PortalProvider>
          <ToastProvider>{props.children}</ToastProvider>
        </PortalProvider>
      </ThemeProvider>
    </TamaguiProviderReal>
  );
}
