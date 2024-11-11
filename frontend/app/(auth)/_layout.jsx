import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';


export default function AuthLayout() {

  return (
      <Stack screenOptions={{
      }}>
        <Stack.Screen name="login"/>
        <Stack.Screen name="register" />
        <Stack.Screen name="main/index.jsx" />
      </Stack>
  );
}
