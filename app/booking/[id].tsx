import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useState } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Calendar, Clock, CreditCard, CheckCircle, ArrowLeft, Sparkles, Zap, MapPin } from "lucide-react-native";
import { Button } from "../../components/ui/Button";
import { useBookingStore } from "../../store/bookingStore";

const TIME_SLOTS = [
    { time: "09:00", period: "Morning" },
    { time: "10:00", period: "Morning" },
    { time: "11:00", period: "Morning" },
    { time: "13:00", period: "Afternoon" },
    { time: "14:00", period: "Afternoon" },
    { time: "15:00", period: "Afternoon" },
    { time: "18:00", period: "Evening" },
    { time: "19:00", period: "Evening" },
    { time: "20:00", period: "Evening" },
];

const DATES = [
    { day: "Mon", date: "25", month: "Oct", full: "2024-10-25" },
    { day: "Tue", date: "26", month: "Oct", full: "2024-10-26" },
    { day: "Wed", date: "27", month: "Oct", full: "2024-10-27" },
    { day: "Thu", date: "28", month: "Oct", full: "2024-10-28" },
    { day: "Fri", date: "29", month: "Oct", full: "2024-10-29" },
];

export default function BookingScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const addBooking = useBookingStore(state => state.addBooking);

    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState("2024-10-25");

    const handleConfirmBooking = () => {
        if (!selectedSlot) return;

        addBooking({
            id: Math.random().toString(36).substring(7),
            venueId: id as string,
            venueName: 'Downtown Arena',
            date: selectedDate,
            time: selectedSlot,
            price: 50,
            status: 'confirmed'
        });

        Alert.alert("🎉 Booking Confirmed!", "Your pitch has been successfully booked. Get ready to play!", [
            { text: "Let's Go!", onPress: () => router.dismissAll() }
        ]);
    };

    const groupedSlots = TIME_SLOTS.reduce((acc, slot) => {
        if (!acc[slot.period]) acc[slot.period] = [];
        acc[slot.period].push(slot);
        return acc;
    }, {} as Record<string, typeof TIME_SLOTS>);

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
                            {/* @ts-ignore */}
                            <ArrowLeft size={20} color="white" />
                        </TouchableOpacity>
                        <View className="bg-white/20 px-3 py-1.5 rounded-full flex-row items-center">
                            {/* @ts-ignore */}
                            <Sparkles size={14} color="white" />
                            <Text className="text-white text-xs font-semibold ml-1.5">Premium Pitch</Text>
                        </View>
                    </View>
                    <Text className="text-white/70 text-sm font-medium">Booking for</Text>
                    <Text className="text-white text-2xl font-bold mt-1">Downtown Arena</Text>
                    <View className="flex-row items-center mt-2 opacity-80">
                        {/* @ts-ignore */}
                        <MapPin size={14} color="white" />
                        <Text className="text-white text-sm ml-1.5">123 Football St, City Center</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 180 }}>
                {/* Date Selection */}
                <View className="px-5 pt-6">
                    <View className="flex-row items-center mb-4">
                        {/* @ts-ignore */}
                        <Calendar size={18} color="#2563eb" />
                        <Text className="text-slate-900 font-bold text-lg ml-2">Select Date</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 px-5">
                        <View className="flex-row gap-3">
                            {DATES.map((d) => (
                                <TouchableOpacity
                                    key={d.full}
                                    onPress={() => setSelectedDate(d.full)}
                                    className={`w-20 py-4 rounded-2xl items-center border-2 ${selectedDate === d.full
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'bg-white border-slate-100'
                                        }`}
                                >
                                    <Text className={`text-xs font-medium ${selectedDate === d.full ? 'text-blue-100' : 'text-slate-400'}`}>
                                        {d.day}
                                    </Text>
                                    <Text className={`text-2xl font-bold mt-1 ${selectedDate === d.full ? 'text-white' : 'text-slate-900'}`}>
                                        {d.date}
                                    </Text>
                                    <Text className={`text-xs font-medium ${selectedDate === d.full ? 'text-blue-100' : 'text-slate-400'}`}>
                                        {d.month}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Time Slots by Period */}
                <View className="px-5 pt-8">
                    <View className="flex-row items-center mb-4">
                        {/* @ts-ignore */}
                        <Clock size={18} color="#2563eb" />
                        <Text className="text-slate-900 font-bold text-lg ml-2">Select Time</Text>
                    </View>

                    {Object.entries(groupedSlots).map(([period, slots]) => (
                        <View key={period} className="mb-6">
                            <Text className="text-slate-500 font-semibold text-sm mb-3 uppercase tracking-wider">{period}</Text>
                            <View className="flex-row flex-wrap gap-3">
                                {slots.map((slot) => (
                                    <TouchableOpacity
                                        key={slot.time}
                                        onPress={() => setSelectedSlot(slot.time)}
                                        className={`px-5 py-3.5 rounded-xl border-2 ${selectedSlot === slot.time
                                            ? 'bg-blue-600 border-blue-600'
                                            : 'bg-white border-slate-100'
                                            }`}
                                    >
                                        <Text className={`font-bold text-base ${selectedSlot === slot.time ? 'text-white' : 'text-slate-800'}`}>
                                            {slot.time}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>

                {/* Price Breakdown Card */}
                <View className="px-5 pt-2">
                    <View className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <Text className="text-slate-900 font-bold text-lg mb-4">Price Breakdown</Text>
                        <View className="flex-row justify-between mb-3">
                            <Text className="text-slate-500">Pitch Rental (1 hr)</Text>
                            <Text className="text-slate-700 font-semibold">$45.00</Text>
                        </View>
                        <View className="flex-row justify-between mb-3">
                            <Text className="text-slate-500">Facility Fee</Text>
                            <Text className="text-slate-700 font-semibold">$5.00</Text>
                        </View>
                        <View className="border-t border-dashed border-slate-200 my-3" />
                        <View className="flex-row justify-between items-center">
                            <Text className="text-slate-900 font-bold text-lg">Total</Text>
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
                    {selectedSlot ? (
                        <View className="flex-row items-center justify-center mb-3 bg-green-50 py-2 rounded-full border border-green-100">
                            {/* @ts-ignore */}
                            <CheckCircle size={16} color="#16a34a" />
                            <Text className="text-green-700 font-semibold text-sm ml-2">
                                {DATES.find(d => d.full === selectedDate)?.day}, {DATES.find(d => d.full === selectedDate)?.date} {DATES.find(d => d.full === selectedDate)?.month} at {selectedSlot}
                            </Text>
                        </View>
                    ) : (
                        <View className="flex-row items-center justify-center mb-3 bg-amber-50 py-2 rounded-full border border-amber-100">
                            {/* @ts-ignore */}
                            <Zap size={16} color="#d97706" />
                            <Text className="text-amber-700 font-semibold text-sm ml-2">Select a time slot to continue</Text>
                        </View>
                    )}
                    <Button
                        size="lg"
                        onPress={handleConfirmBooking}
                        disabled={!selectedSlot}
                        className={`w-full rounded-xl shadow-lg shadow-blue-200 ${!selectedSlot ? 'opacity-50' : ''}`}
                    >
                        <View className="flex-row items-center justify-center">
                            {/* @ts-ignore */}
                            <CreditCard size={20} color="white" />
                            <Text className="text-white font-bold text-base ml-2">Confirm & Pay $50.00</Text>
                        </View>
                    </Button>
                </View>
            </View>
        </View>
    );
}
