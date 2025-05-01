// layout.tsx
import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#1A0D0E',
    card: '#1A0D0E',
    text: '#FFFFFF',
    border: '#333333',
    primary: '#FF4D4D',
  },
};

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#000000',
    border: '#CCCCCC',
    primary: '#FF4D4D',
  },
};


export default function Layout() {
  const colorScheme = 'dark';
  
  return ( // Name of the stack is the name of the folder
    // The stack is the main navigation container (Page Name)
    // Initially all header shown set to False
    <ThemeProvider value={colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
      <Stack>
        <Stack.Screen 
          name="login" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="customerPg"
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="redButton" 
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="signUP" 
          options={{ headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  );
}