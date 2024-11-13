import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function MainLayout() {
    return (
        <Stack screenOptions={{
          headerShown: Platform.OS !== 'web',
        }}>
         
          <Stack.Screen name="index"/>
        </Stack>
    )
}