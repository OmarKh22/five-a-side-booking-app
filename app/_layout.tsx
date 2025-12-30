import "../global.css";
import "../lib/i18n"; // Initialize i18n
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { LanguageProvider } from "../contexts/LanguageContext";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function Layout() {
    const initialize = useAuthStore((state) => state.initialize);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <LanguageProvider>
            <View className="flex-1">
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="venue/[id]" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="booking/[id]" options={{ presentation: 'modal' }} />
                </Stack>
                <StatusBar style="auto" />
            </View>
        </LanguageProvider>
    );
}
