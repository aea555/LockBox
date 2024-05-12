import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectAuthStatus, selectPasscode } from "../../utils/authSlice";
import { StyleSheet, useColorScheme, Image } from "react-native";
import { Text} from "tamagui";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  RedHatDisplay_400Regular,
  RedHatDisplay_900Black,
  useFonts,
} from "@expo-google-fonts/dev";
import { useQuery } from "@realm/react";
import { AuthSchema } from "../../utils/DbSchemas";

export default function DrawerLayout() {
  const router = useRouter();
  const isAuthenticated = useSelector(selectAuthStatus);
  const hasPasscode = useQuery({ type: AuthSchema }).length > 0;
  const colorScheme = useColorScheme();

  let [fontsLoaded] = useFonts({
    RedHatDisplay_900Black,
    RedHatDisplay_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  if (!isAuthenticated && !hasPasscode) {
    return <Redirect href="/createpasscode" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: () => <Text style={styles.pageFont}>Home</Text>,
            headerTitle: () => (
              <Image
                source={require("../../static/Lockbox.png")}
                style={styles.image}
              />
            ),
            drawerIcon: () => (
              <FontAwesome
                color={colorScheme === "dark" ? "white" : "black"}
                size={20}
                name="home"
              />
            ),
            headerTransparent: false,
            headerTintColor: colorScheme === "dark" ? "white" : "black",
            drawerActiveBackgroundColor: "darkorchid",
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: () => <Text style={styles.pageFont}>Settings</Text>,
            headerTitle: () => (
              <Image
                source={require("../../static/Lockbox.png")}
                style={styles.image}
              />
            ),
            drawerIcon: () => (
              <FontAwesome
                color={colorScheme === "dark" ? "white" : "black"}
                size={20}
                name="gear"
              />
            ),
            headerTransparent: false,
            headerTintColor: colorScheme === "dark" ? "white" : "black",
            drawerActiveBackgroundColor: "darkorchid",
          }}
        />
        <Drawer.Screen
          name="newsecret"
          options={{
            drawerLabel: "",
            headerTitle: () => (
              <Image
                source={require("../../static/Lockbox.png")}
                style={styles.image}
              />
            ),
            drawerIcon: () => <></>,
            headerTransparent: false,
            headerTintColor: colorScheme === "dark" ? "white" : "black",
            swipeEnabled: false,
            drawerStyle: { display: "none" },
            headerLeft: () => (
              <FontAwesome
                color={colorScheme === "dark" ? "white" : "black"}
                size={22}
                name="arrow-left"
                style={styles.backButton}
                onPress={() => {
                  router.canGoBack() ? router.back() : router.replace("/");
                }}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  pageFont: {
    fontFamily: "RedHatDisplay_900Black",
  },
  image: {
    height: 55,
    aspectRatio: 2.56,
  },
  backButton: {
    alignSelf: "center",
    marginLeft: "7%"
  },
});
