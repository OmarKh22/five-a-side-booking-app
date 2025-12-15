import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, Clock, CreditCard } from "lucide-react-native";
import { Button } from "../../components/ui/Button";
import { useBookingStore } from "../../store/bookingStore";

const TIME_SLOTS = [
    "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "18:00", "19:00", "20:00"
];

export default function BookingScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const addBooking = useBookingStore(state => state.addBooking);

    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState("2024-10-25"); // Mock date

    const handleConfirmBooking = () => {
        if (!selectedSlot) return;

        // Mock booking creation
        addBooking({
            id: Math.random().toString(36).substring(7),
            venueId: id as string,
            venueName: 'Downtown Arena', // Should fetch real name
            date: selectedDate,
            time: selectedSlot,
            price: 50,
            status: 'confirmed'
        });

        Alert.alert("Booking Confirmed!", "Your pitch has been successfully booked.", [
            { text: "OK", onPress: () => router.dismissAll() }
        ]);
        // Ideally navigate to a success page or back to home
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Stack.Screen options={{ presentation: 'modal', title: 'Book Slot' }} />

            <View className="flex-1 px-6 pt-4">
                <Text className="text-xl font-bold text-gray-900 mb-6">Select Date & Time</Text>

                {/* Date Picker (Mock) */}
                <View className="flex-row items-center mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    {/* @ts-ignore */}
                    <Calendar size={24} color="#2563eb" />
                    <View className="ml-4">
                        <Text className="text-gray-500 text-sm">Date</Text>
                        <Text className="font-bold text-gray-900 text-lg">Oct 25, 2024</Text>
                    </View>
                </View>

                {/* Slots Grid */}
                <Text className="font-semibold text-gray-800 mb-4">Available Slots</Text>
                <View className="flex-row flex-wrap justify-between">
                    {TIME_SLOTS.map((slot) => (
                        <TouchableOpacity
                            key={slot}
                            onPress={() => setSelectedSlot(slot)}
                            className={`w-[30%] py-3 mb-4 rounded-lg items-center border ${selectedSlot === slot
                                ? 'bg-blue-600 border-blue-600'
                                : 'bg-white border-gray-200'
                                }`}
                        >
                            <Text className={`font-medium ${selectedSlot === slot ? 'text-white' : 'text-gray-700'}`}>
                                {slot}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Bottom Bar */}
            <View className="p-6 border-t border-gray-100 bg-white">
                <View className="flex-row justify-between mb-4">
                    <Text className="text-gray-600">Total Amount</Text>
                    <Text className="font-bold text-xl text-gray-900">$50.00</Text>
                </View>
                <Button
                    size="lg"
                    onPress={handleConfirmBooking}
                    disabled={!selectedSlot}
                    className={!selectedSlot ? 'opacity-50' : ''}
                >
                    <View className="flex-row items-center">
                        {/* @ts-ignore */}
                        <CreditCard size={18} color="white" className="mr-2" />
                        <Text className="text-white font-medium ml-2">Pay & Book</Text>
                    </View>
                </Button>
            </View>
        </SafeAreaView>
    );
}
