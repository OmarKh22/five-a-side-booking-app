import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { MapPin, Wifi, Car, Star, Clock, CheckCircle } from "lucide-react-native";
import { Button } from "../../components/ui/Button";

// Mock data lookup - in real app fetch by ID
const VENUE_DETAILS: Record<string, any> = {
    '1': { name: 'Downtown Arena', description: 'Premier 5-a-side facility with floodlights and changing rooms.', rating: 4.8, price: '$50/hr', image: 'https://images.unsplash.com/photo-1579952363873-27f3bde9be51?q=80&w=600&auto=format&fit=crop' },
    '2': { name: 'Westside Keepers', description: 'Great synthetic turf for fast gameplay.', rating: 4.5, price: '$45/hr', image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=600&auto=format&fit=crop' },
    '3': { name: 'Community Center', description: 'Budget friendly option for casual games.', rating: 4.2, price: '$40/hr', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop' },
    // Default fallback
    'default': { name: 'Unknown Venue', description: 'Information not available', rating: 0, price: '$0/hr', image: '' }
};

export default function VenueDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const venue = (VENUE_DETAILS as Record<string, any>)[id as string] || VENUE_DETAILS['default'];

    return (
        <View className="flex-1 bg-white">
            <Stack.Screen options={{
                headerShown: true,
                title: venue.name,
                headerTintColor: '#1f2937',
                headerBackTitle: 'Back'
            }} />

            <ScrollView className="flex-1 pb-24">
                <Image source={{ uri: venue.image || 'https://via.placeholder.com/600' }} className="w-full h-64 bg-gray-200" resizeMode="cover" />

                <View className="p-6">
                    <View className="flex-row justify-between items-start mb-4">
                        <View className="flex-1">
                            <Text className="text-2xl font-bold text-gray-900">{venue.name}</Text>
                            <View className="flex-row items-center mt-2">
                                {/* @ts-ignore */}
                                <MapPin size={18} color="#6b7280" />
                                <Text className="text-gray-500 ml-1">123 Football St, City Center</Text>
                            </View>
                        </View>
                        <View className="bg-blue-50 px-3 py-1 rounded-lg">
                            <View className="flex-row items-center">
                                {/* @ts-ignore */}
                                <Star size={16} color="#2563eb" fill="#2563eb" />
                                <Text className="ml-1 text-blue-700 font-bold">{venue.rating}</Text>
                            </View>
                        </View>
                    </View>

                    <View className="mb-6">
                        <Text className="text-gray-600 leading-relaxed">{venue.description}</Text>
                    </View>

                    <Text className="text-lg font-bold text-gray-900 mb-3">Facilities</Text>
                    <View className="flex-row flex-wrap mb-6">
                        <View className="flex-row items-center mr-6 mb-2">
                            {/* @ts-ignore */}
                            <Wifi size={20} color="#4b5563" />
                            <Text className="ml-2 text-gray-700">Free WiFi</Text>
                        </View>
                        <View className="flex-row items-center mr-6 mb-2">
                            {/* @ts-ignore */}
                            <Car size={20} color="#4b5563" />
                            <Text className="ml-2 text-gray-700">Parking</Text>
                        </View>
                        <View className="flex-row items-center mr-6 mb-2">
                            {/* @ts-ignore */}
                            <CheckCircle size={20} color="#4b5563" />
                            <Text className="ml-2 text-gray-700">Showers</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-100 pb-8">
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-gray-500">Price per hour</Text>
                    <Text className="text-2xl font-bold text-blue-600">{venue.price}</Text>
                </View>
                <Button size="lg" onPress={() => router.push(`/booking/${id}`)}>
                    Book Now
                </Button>
            </View>
        </View>
    );
}
