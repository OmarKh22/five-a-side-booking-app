import { View, Text, ScrollView, TouchableOpacity, Alert, Platform } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useState } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Calendar, Clock, CreditCard, CheckCircle, ArrowLeft, Sparkles, Zap, MapPin, Loader } from "lucide-react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from "../../components/ui/Button";
import { useBookingStore } from "../../store/bookingStore";
import { useTranslation } from "react-i18next";

export default function BookingScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { addBooking, loading } = useBookingStore();
    const { t } = useTranslation();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Get minimum date (today)
    const minDate = new Date();

    // Get maximum date (60 days from now)
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 60);

    const handleDateChange = (event: any, date?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (date) {
            setSelectedDate(date);
        }
    };

    const handleTimeChange = (event: any, time?: Date) => {
        setShowTimePicker(Platform.OS === 'ios');
        if (time) {
            setSelectedTime(time);
        }
    };

    const formatDate = (date: Date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const handleConfirmBooking = async () => {
        if (!selectedTime) return;

        try {
            await addBooking({
                venue_id: Number(id),
                date: selectedDate.toISOString().split('T')[0],
                time_slot: formatTime(selectedTime),
                amount: 50,
                // user_id will be handled by store
            });

            Alert.alert(
                `🎉 ${t('booking.bookingConfirmed')}`,
                t('booking.bookingSuccess'),
                [{ text: t('common.done'), onPress: () => router.dismissAll() }]
            );
        } catch (error: any) {
            console.error("Booking failed:", error);
            Alert.alert("Booking Failed", error.message || "An unknown error occurred.");
        }
    };

    return (
        <View className="flex-1 bg-slate-50">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Premium Header */}
            <View className="bg-blue-600 pt-2" style={{ paddingTop: insets.top }}>
                <View className="px-5 pb-6">
                    <View className="flex-row items-center justify-between mb-4">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
                        >
                            <ArrowLeft size={20} color="white" />
                        </TouchableOpacity>
                        <View className="bg-white/20 px-3 py-1.5 rounded-full flex-row items-center">
                            <Sparkles size={14} color="white" />
                            <Text className="text-white text-xs font-semibold ml-1.5">{t('discovery.premium')}</Text>
                        </View>
                    </View>
                    <Text className="text-white/70 text-sm font-medium">{t('booking.bookVenue')}</Text>
                    <Text className="text-white text-2xl font-bold mt-1">Downtown Arena</Text>
                    <View className="flex-row items-center mt-2 opacity-80">
                        <MapPin size={14} color="white" />
                        <Text className="text-white text-sm ml-1.5">123 Football St, City Center</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 180 }}
            >
                {/* Date Selection */}
                <View className="px-5 pt-6">
                    <View className="flex-row items-center mb-4">
                        <Calendar size={18} color="#2563eb" />
                        <Text className="text-slate-900 font-bold text-lg ml-2">{t('booking.selectDate')}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        className="bg-white rounded-2xl p-5 border-2 border-blue-600 shadow-sm"
                    >
                        <View className="flex-row items-center justify-between">
                            <View>
                                <Text className="text-slate-500 text-sm mb-1">{t('booking.chooseDate')}</Text>
                                <Text className="text-slate-900 font-bold text-lg">
                                    {formatDate(selectedDate)}
                                </Text>
                            </View>
                            <View className="bg-blue-50 p-3 rounded-full">
                                <Calendar size={24} color="#2563eb" />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <View className="mt-4">
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={handleDateChange}
                                minimumDate={minDate}
                                maximumDate={maxDate}
                                textColor="#1e293b"
                            />
                            {Platform.OS === 'ios' && (
                                <TouchableOpacity
                                    onPress={() => setShowDatePicker(false)}
                                    className="bg-blue-600 py-3 rounded-xl mt-3"
                                >
                                    <Text className="text-white font-bold text-center">{t('common.done')}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>

                {/* Time Selection */}
                <View className="px-5 pt-6">
                    <View className="flex-row items-center mb-4">
                        <Clock size={18} color="#2563eb" />
                        <Text className="text-slate-900 font-bold text-lg ml-2">{t('booking.selectTime')}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => setShowTimePicker(true)}
                        className={`bg-white rounded-2xl p-5 border-2 shadow-sm ${selectedTime ? 'border-blue-600' : 'border-slate-200'
                            }`}
                    >
                        <View className="flex-row items-center justify-between">
                            <View>
                                <Text className="text-slate-500 text-sm mb-1">{t('booking.chooseTime')}</Text>
                                <Text className="text-slate-900 font-bold text-lg">
                                    {selectedTime ? formatTime(selectedTime) : t('booking.chooseTime')}
                                </Text>
                            </View>
                            <View className={`p-3 rounded-full ${selectedTime ? 'bg-blue-50' : 'bg-slate-100'}`}>
                                <Clock size={24} color={selectedTime ? "#2563eb" : "#94a3b8"} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {showTimePicker && (
                        <View className="mt-4">
                            <DateTimePicker
                                value={selectedTime || new Date()}
                                mode="time"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={handleTimeChange}
                                minuteInterval={30}
                                textColor="#1e293b"
                            />
                            {Platform.OS === 'ios' && (
                                <TouchableOpacity
                                    onPress={() => setShowTimePicker(false)}
                                    className="bg-blue-600 py-3 rounded-xl mt-3"
                                >
                                    <Text className="text-white font-bold text-center">{t('common.done')}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>

                {/* Price Breakdown Card */}
                <View className="px-5 pt-6">
                    <View className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <Text className="text-slate-900 font-bold text-lg mb-4">{t('booking.priceSummary')}</Text>
                        <View className="flex-row justify-between mb-3">
                            <Text className="text-slate-500">{t('booking.basePrice')} (1 {t('booking.hour')})</Text>
                            <Text className="text-slate-700 font-semibold">$45.00</Text>
                        </View>
                        <View className="flex-row justify-between mb-3">
                            <Text className="text-slate-500">Facility Fee</Text>
                            <Text className="text-slate-700 font-semibold">$5.00</Text>
                        </View>
                        <View className="border-t border-dashed border-slate-200 my-3" />
                        <View className="flex-row justify-between items-center">
                            <Text className="text-slate-900 font-bold text-lg">{t('booking.total')}</Text>
                            <Text className="text-blue-600 font-extrabold text-2xl">$50.00</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Bottom CTA Bar */}
            <View
                className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100"
                style={{ paddingBottom: Math.max(insets.bottom, 16) }}
            >
                <View className="px-5 pt-4">
                    {selectedTime ? (
                        <View className="flex-row items-center justify-center mb-3 bg-green-50 py-2 rounded-full border border-green-100">
                            <CheckCircle size={16} color="#16a34a" />
                            <Text className="text-green-700 font-semibold text-sm ml-2">
                                {formatDate(selectedDate)} at {formatTime(selectedTime)}
                            </Text>
                        </View>
                    ) : (
                        <View className="flex-row items-center justify-center mb-3 bg-amber-50 py-2 rounded-full border border-amber-100">
                            <Zap size={16} color="#d97706" />
                            <Text className="text-amber-700 font-semibold text-sm ml-2">
                                {t('booking.selectDateTime')}
                            </Text>
                        </View>
                    )}
                    <Button
                        size="lg"
                        onPress={handleConfirmBooking}
                        disabled={!selectedTime}
                        className={`w-full rounded-xl shadow-lg shadow-blue-200 ${!selectedTime ? 'opacity-50' : ''
                            }`}
                    >
                        <View className="flex-row items-center justify-center">
                            {loading ? (
                                <Loader size={20} color="white" className="animate-spin" />
                            ) : (
                                <>
                                    <CreditCard size={20} color="white" />
                                    <Text className="text-white font-bold text-base ml-2">
                                        {t('booking.confirmBooking')} $50.00
                                    </Text>
                                </>
                            )}
                        </View>
                    </Button>
                </View>
            </View>
        </View>
    );
}