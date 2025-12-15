import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useBookingStore } from "../../store/bookingStore";
import { User, CreditCard, Settings, LogOut, ChevronRight } from "lucide-react-native";

export default function ProfileScreen() {
    const router = useRouter();
    const { user, logout } = useBookingStore();

    const handleLogout = () => {
        Alert.alert("Sign Out", "Are you sure you want to sign out?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Sign Out",
                style: "destructive",
                onPress: () => {
                    logout();
                    router.replace('/(auth)/login');
                }
            }
        ]);
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 px-4">
            <Text className="text-2xl font-bold text-gray-900 mt-4 mb-6">Profile</Text>

            <View className="items-center mb-8">
                <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4 border-4 border-white shadow-sm">
                    <Text className="text-3xl text-blue-600 font-bold">
                        {user?.name?.[0] || "U"}
                    </Text>
                </View>
                <Text className="text-xl font-bold text-gray-900">{user?.name || "Guest User"}</Text>
                <Text className="text-gray-500">{user?.email || "guest@example.com"}</Text>
            </View>

            <View className="bg-white rounded-xl overflow-hidden border border-gray-100">
                <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
                    <View className="bg-blue-50 p-2 rounded-lg">
                        {/* @ts-ignore */}
                        <User size={20} color="#2563eb" />
                    </View>
                    <Text className="flex-1 ml-4 text-gray-700 font-medium">Personal Information</Text>
                    {/* @ts-ignore */}
                    <ChevronRight size={20} color="#9ca3af" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
                    <View className="bg-blue-50 p-2 rounded-lg">
                        {/* @ts-ignore */}
                        <CreditCard size={20} color="#2563eb" />
                    </View>
                    <Text className="flex-1 ml-4 text-gray-700 font-medium">Payment Methods</Text>
                    {/* @ts-ignore */}
                    <ChevronRight size={20} color="#9ca3af" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center p-4">
                    <View className="bg-blue-50 p-2 rounded-lg">
                        {/* @ts-ignore */}
                        <Settings size={20} color="#2563eb" />
                    </View>
                    <Text className="flex-1 ml-4 text-gray-700 font-medium">Settings</Text>
                    {/* @ts-ignore */}
                    <ChevronRight size={20} color="#9ca3af" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={handleLogout}
                className="mt-6 flex-row items-center justify-center p-4 bg-red-50 rounded-xl border border-red-100"
            >
                {/* @ts-ignore */}
                <LogOut size={20} color="#ef4444" />
                <Text className="ml-2 text-red-600 font-bold">Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
