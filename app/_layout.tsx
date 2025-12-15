import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function Layout() {
    return (
        <View className="flex-1">
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="venue/[id]" options={{ presentation: 'modal' }} />
                <Stack.Screen name="booking/[id]" options={{ presentation: 'modal' }} />
            </Stack>
            <StatusBar style="auto" />
        </View>
    );
}
