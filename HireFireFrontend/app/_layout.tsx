// layout.tsx
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

import { Slot } from "expo-router";
import SidebarLayout from "../components/sidebarWrapper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#1A0D0E",
    card: "#1A0D0E",
    text: "#FFFFFF",
    border: "#333333",
    primary: "#FF4D4D",
  },
};

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#000000",
    border: "#CCCCCC",
    primary: "#FF4D4D",
  },
};

export default function Layout() {
  const colorScheme = "dark";

  return (
      <ThemeProvider
        value={colorScheme === "dark" ? CustomDarkTheme : CustomLightTheme}
      >
        <SidebarLayout>
          <Slot />
        </SidebarLayout>
      </ThemeProvider>
      );
}
