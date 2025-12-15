import { Tabs } from "expo-router";
import { View } from "react-native";

// Simple icon component placeholder - in real app use Lucide or Ionicons
function TabIcon({ color, name }: { color: string; name: string }) {
    return <View style={{ width: 24, height: 24, backgroundColor: color, borderRadius: 12 }} />;
}

export default function TabLayout() {
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
                    title: "Discovery",
                    tabBarIcon: ({ color }) => <TabIcon color={color} name="search" />,
                }}
            />
            <Tabs.Screen
                name="bookings"
                options={{
                    title: "Bookings",
                    tabBarIcon: ({ color }) => <TabIcon color={color} name="calendar" />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <TabIcon color={color} name="user" />,
                }}
            />
        </Tabs>
    );
}
