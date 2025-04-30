// layout.tsx
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

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
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="customerPg" options={{ headerShown: false }} />
        <Stack.Screen name="redButton" options={{ headerShown: false }} />
        <Stack.Screen
          name="customerPg2"
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="customerPg3"
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen name="customerPg4" options={{ headerShown: false }} />
        <Stack.Screen name="appointmentsPg" options={{ headerShown: false }} />
        <Stack.Screen name="chatPg" options={{ headerShown: false }} />
        <Stack.Screen name="earningsPg" options={{ headerShown: false }} />
        <Stack.Screen name="myClientsPg" options={{ headerShown: false }} />
        <Stack.Screen name="myPerformancePg" options={{ headerShown: false }} />
        <Stack.Screen name="rateAndReviewPg" options={{ headerShown: false }} />
        <Stack.Screen name="workerPg" options={{ headerShown: false }} />
        <Stack.Screen name="ReviewPg" options={{ headerShown: true }} />
        <Stack.Screen name="FeedbackPage" options={{ headerShown: true }} />
      </Stack>
    </ThemeProvider>
  );
}
