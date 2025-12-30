import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabase";
import { useState } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert("Error", error.message);
        } else {
            router.replace('/(tabs)');
        }
        setLoading(false);
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-6 justify-center">
            <View className="items-center mb-10">
                <Text className="text-4xl font-bold text-blue-600 mb-2">{t('auth.appName')}</Text>
                <Text className="text-gray-500 text-lg">{t('auth.bookYourPitch')}</Text>
            </View>

            <View className="space-y-4 w-full">
                <Input
                    placeholder={t('auth.email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    placeholder={t('auth.password')}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity className="items-end">
                    <Text className="text-blue-600 font-medium">{t('auth.forgotPassword')}</Text>
                </TouchableOpacity>

                <Button onPress={handleLogin} size="lg" className="mt-4" disabled={loading}>
                    {loading ? "Signing in..." : t('auth.signIn')}
                </Button>

                <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-600">{t('auth.dontHaveAccount')} </Text>
                    <Link href="/(auth)/sign-up" asChild>
                        <TouchableOpacity>
                            <Text className="text-blue-600 font-bold">{t('auth.signUp')}</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
}
