import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { User, CreditCard, Settings, LogOut, ChevronRight, Globe } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguageContext";

export default function ProfileScreen() {
    const router = useRouter();
    const { user, signOut } = useAuthStore();
    const { t } = useTranslation();
    const { language, setLanguage } = useLanguage();

    const handleLogout = () => {
        Alert.alert(t('auth.signOut'), t('profile.signOutConfirm'), [
            { text: t('common.cancel'), style: "cancel" },
            {
                text: t('auth.signOut'),
                style: "destructive",
                onPress: async () => {
                    await signOut();
                    router.replace('/(auth)/login');
                }
            }
        ]);
    };

    const handleLanguageSwitch = () => {
        Alert.alert(
            t('profile.selectLanguage'),
            '',
            [
                {
                    text: t('profile.english'),
                    onPress: () => setLanguage('en'),
                    style: language === 'en' ? 'default' : 'default'
                },
                {
                    text: t('profile.arabic'),
                    onPress: () => setLanguage('ar'),
                    style: language === 'ar' ? 'default' : 'default'
                },
                { text: t('common.cancel'), style: 'cancel' }
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 px-4">
            <Text className="text-2xl font-bold text-gray-900 mt-4 mb-6">{t('profile.profile')}</Text>

            <View className="items-center mb-8">
                <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4 border-4 border-white shadow-sm">
                    <Text className="text-3xl text-blue-600 font-bold">
                        {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U"}
                    </Text>
                </View>
                <Text className="text-xl font-bold text-gray-900">{user?.user_metadata?.full_name || t('profile.guestUser')}</Text>
                <Text className="text-gray-500">{user?.email || ""}</Text>
            </View>

            <View className="bg-white rounded-xl overflow-hidden border border-gray-100">
                <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
                    <View className="bg-blue-50 p-2 rounded-lg">
                        {/* @ts-ignore */}
                        <User size={20} color="#2563eb" />
                    </View>
                    <Text className="flex-1 ml-4 text-gray-700 font-medium">{t('profile.personalInfo')}</Text>
                    {/* @ts-ignore */}
                    <ChevronRight size={20} color="#9ca3af" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
                    <View className="bg-blue-50 p-2 rounded-lg">
                        {/* @ts-ignore */}
                        <CreditCard size={20} color="#2563eb" />
                    </View>
                    <Text className="flex-1 ml-4 text-gray-700 font-medium">{t('profile.paymentMethods')}</Text>
                    {/* @ts-ignore */}
                    <ChevronRight size={20} color="#9ca3af" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
                    <View className="bg-blue-50 p-2 rounded-lg">
                        {/* @ts-ignore */}
                        <Settings size={20} color="#2563eb" />
                    </View>
                    <Text className="flex-1 ml-4 text-gray-700 font-medium">{t('profile.settings')}</Text>
                    {/* @ts-ignore */}
                    <ChevronRight size={20} color="#9ca3af" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleLanguageSwitch}
                    className="flex-row items-center p-4"
                >
                    <View className="bg-green-50 p-2 rounded-lg">
                        {/* @ts-ignore */}
                        <Globe size={20} color="#16a34a" />
                    </View>
                    <Text className="flex-1 ml-4 text-gray-700 font-medium">{t('profile.language')}</Text>
                    <Text className="text-gray-500 mr-2">
                        {language === 'en' ? 'English' : 'العربية'}
                    </Text>
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
                <Text className="ml-2 text-red-600 font-bold">{t('auth.signOut')}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
