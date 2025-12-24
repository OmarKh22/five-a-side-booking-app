import { View, Text, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBookingStore } from "../../store/bookingStore";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useTranslation } from "react-i18next";

export default function SignUpScreen() {
    const router = useRouter();
    const login = useBookingStore((state) => state.login);
    const { t } = useTranslation();

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
                <Text className="text-3xl font-bold text-blue-600 mb-2">{t('auth.createAccount')}</Text>
                <Text className="text-gray-500">{t('auth.joinCommunity')}</Text>
            </View>

            <View className="space-y-4 w-full">
                <Input placeholder={t('auth.fullName')} />
                <Input placeholder={t('auth.email')} keyboardType="email-address" />
                <Input placeholder={t('auth.password')} secureTextEntry />
                <Input placeholder={t('auth.confirmPassword')} secureTextEntry />

                <Button onPress={handleSignUp} size="lg" className="mt-4">
                    {t('auth.createAccount')}
                </Button>

                <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-600">{t('auth.alreadyHaveAccount')} </Text>
                    <Link href="/(auth)/login" asChild>
                        <TouchableOpacity>
                            <Text className="text-blue-600 font-bold">{t('auth.signIn')}</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
}
