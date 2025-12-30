import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabase";
import { useState } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useTranslation } from "react-i18next";

export default function SignUpScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                }
            }
        });

        if (error) {
            Alert.alert("Error", error.message);
        } else {
            Alert.alert("Success", "Account created! Please sign in.");
            router.replace('/(auth)/login');
        }
        setLoading(false);
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-6 justify-center">
            <View className="items-center mb-10">
                <Text className="text-3xl font-bold text-blue-600 mb-2">{t('auth.createAccount')}</Text>
                <Text className="text-gray-500">{t('auth.joinCommunity')}</Text>
            </View>

            <View className="space-y-4 w-full">
                <Input
                    placeholder={t('auth.fullName')}
                    value={name}
                    onChangeText={setName}
                />
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
                <Input
                    placeholder={t('auth.confirmPassword')}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <Button onPress={handleSignUp} size="lg" className="mt-4" disabled={loading}>
                    {loading ? "Creating Account..." : t('auth.createAccount')}
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
