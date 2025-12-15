import { View, Text, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBookingStore } from "../../store/bookingStore";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function SignUpScreen() {
    const router = useRouter();
    const login = useBookingStore((state) => state.login);

    const handleSignUp = () => {
        // Mock sign up
        login({
            id: '1',
            name: 'New User',
            email: 'new@example.com',
            role: 'player'
        });
        router.replace('/(tabs)');
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-6 justify-center">
            <View className="items-center mb-10">
                <Text className="text-3xl font-bold text-blue-600 mb-2">Create Account</Text>
                <Text className="text-gray-500">Join the community</Text>
            </View>

            <View className="space-y-4 w-full">
                <Input placeholder="Full Name" />
                <Input placeholder="Email" keyboardType="email-address" />
                <Input placeholder="Password" secureTextEntry />
                <Input placeholder="Confirm Password" secureTextEntry />

                <Button onPress={handleSignUp} size="lg" className="mt-4">
                    Create Account
                </Button>

                <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-600">Already have an account? </Text>
                    <Link href="/(auth)/login" asChild>
                        <TouchableOpacity>
                            <Text className="text-blue-600 font-bold">Sign In</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
}
