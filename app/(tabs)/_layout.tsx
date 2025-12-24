import { Tabs } from "expo-router";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

// Simple icon component placeholder - in real app use Lucide or Ionicons
function TabIcon({ color, name }: { color: string; name: string }) {
    return <View style={{ width: 24, height: 24, backgroundColor: color, borderRadius: 12 }} />;
}

export default function TabLayout() {
    const { t } = useTranslation();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#2563eb",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: t('tabs.discover'),
                    tabBarIcon: ({ color }) => <TabIcon color={color} name="search" />,
                }}
            />
            <Tabs.Screen
                name="bookings"
                options={{
                    title: t('tabs.bookings'),
                    tabBarIcon: ({ color }) => <TabIcon color={color} name="calendar" />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: t('tabs.profile'),
                    tabBarIcon: ({ color }) => <TabIcon color={color} name="user" />,
                }}
            />
        </Tabs>
    );
}
