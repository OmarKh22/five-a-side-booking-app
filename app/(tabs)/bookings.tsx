import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBookingStore } from "../../store/bookingStore";
import { Calendar, Clock, MapPin } from "lucide-react-native";
import { useTranslation } from "react-i18next";

export default function BookingsScreen() {
    const bookings = useBookingStore(state => state.bookings);
    const { t } = useTranslation();

    return (
        <SafeAreaView className="flex-1 bg-gray-50 px-4">
            <Text className="text-2xl font-bold text-gray-900 mt-4 mb-6">{t('bookings.myBookings')}</Text>

            {bookings.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                    <Text className="text-gray-500 text-lg">{t('bookings.noBookings')}</Text>
                    <Text className="text-gray-400 text-center mt-2 px-10">{t('bookings.noBookingsDescription')}</Text>
                </View>
            ) : (
                <FlatList
                    data={bookings}
                    keyExtractor={item => item.id || `temp-${Math.random()}`}
                    renderItem={({ item }) => (
                        <View className="bg-white rounded-xl p-4 mb-4 border border-gray-100 shadow-sm">
                            <View className="flex-row justify-between items-start mb-2">
                                <Text className="font-bold text-lg text-gray-900">{item.venues?.name || "Unknown Venue"}</Text>
                                <View className="bg-green-100 px-2 py-1 rounded text-xs">
                                    <Text className="text-green-700 text-xs font-bold uppercase">
                                        {t(`bookings.status.${item.status.toLowerCase()}`)}
                                    </Text>
                                </View>
                            </View>

                            <View className="space-y-2">
                                <View className="flex-row items-center text-gray-600">
                                    <Calendar size={16} color="#6b7280" />
                                    <Text className="ml-2 text-gray-600">{item.date}</Text>
                                </View>
                                <View className="flex-row items-center text-gray-600">
                                    <Clock size={16} color="#6b7280" />
                                    <Text className="ml-2 text-gray-600">{item.time_slot}</Text>
                                </View>
                                <View className="flex-row items-center text-gray-600">
                                    <MapPin size={16} color="#6b7280" />
                                    <Text className="ml-2 text-gray-600">{item.venues?.address || "Unknown Address"}</Text>
                                </View>
                            </View>

                            <View className="mt-4 pt-3 border-t border-gray-100 flex-row justify-between items-center">
                                <Text className="text-gray-500">{t('bookings.totalPaid')}</Text>
                                <Text className="font-bold text-lg text-gray-900">${item.amount}</Text>
                            </View>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
}
