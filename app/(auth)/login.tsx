import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBookingStore } from "../../store/bookingStore";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function LoginScreen() {
    const router = useRouter();
    const login = useBookingStore((state) => state.login);

    const handleLogin = () => {
        // Mock login
        login({
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'player'
        });
        router.replace('/(tabs)');
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-6 justify-center">
            <View className="items-center mb-10">
                <Text className="text-4xl font-bold text-blue-600 mb-2">5-a-Side</Text>
                <Text className="text-gray-500 text-lg">Book your pitch in seconds</Text>
            </View>

            <View className="space-y-4 w-full">
                <Input placeholder="Email" keyboardType="email-address" />
                <Input placeholder="Password" secureTextEntry />

                <TouchableOpacity className="items-end">
                    <Text className="text-blue-600 font-medium">Forgot Password?</Text>
                </TouchableOpacity>

                <Button onPress={handleLogin} size="lg" className="mt-4">
                    Sign In
                </Button>

                <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-600">Don't have an account? </Text>
                    <Link href="/(auth)/sign-up" asChild>
                        <TouchableOpacity>
                            <Text className="text-blue-600 font-bold">Sign Up</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
}
