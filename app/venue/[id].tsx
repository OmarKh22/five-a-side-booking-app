import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { 
    MapPin, Wifi, Car, Star, Clock, CheckCircle, 
    ArrowLeft, Sparkles, Users, Shield, Zap, Calendar 
} from "lucide-react-native";
import { Button } from "../../components/ui/Button";

const { width } = Dimensions.get('window');

// Mock data - Enhanced
const VENUE_DETAILS: Record<string, any> = {
    "1": {
        name: "Downtown Arena",
        description: "Premier 5-a-side facility with floodlights and changing rooms. Experience world-class playing conditions with our state-of-the-art artificial turf, professional lighting system, and modern amenities. Perfect for competitive matches and casual games alike.",
        rating: 4.8,
        reviews: 234,
        price: "$50",
        type: "Premium",
        surface: "Artificial Turf",
        capacity: "10 players",
        address: "123 Football St, City Center",
        distance: "1.2 km away",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bde9be51?q=80&w=600&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1579952363873-27f3bde9be51?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop",
        ],
        facilities: [
            { icon: Wifi, label: "Free WiFi", available: true },
            { icon: Car, label: "Parking", available: true },
            { icon: CheckCircle, label: "Showers", available: true },
            { icon: Users, label: "Changing Rooms", available: true },
            { icon: Shield, label: "Security", available: true },
            { icon: Zap, label: "Floodlights", available: true },
        ],
        openingHours: "Mon-Sun: 06:00 - 23:00",
    },
    "2": {
        name: "Westside Keepers",
        description: "Modern indoor facility with climate control and professional-grade equipment. Perfect for year-round play.",
        rating: 4.5,
        reviews: 187,
        price: "$45",
        type: "Popular",
        surface: "Indoor Court",
        capacity: "8 players",
        address: "456 Sports Ave, West District",
        distance: "2.1 km away",
        image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=600&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=600&auto=format&fit=crop",
        ],
        facilities: [
            { icon: Wifi, label: "Free WiFi", available: true },
            { icon: Car, label: "Parking", available: true },
            { icon: CheckCircle, label: "Showers", available: true },
            { icon: Users, label: "Changing Rooms", available: true },
        ],
        openingHours: "Mon-Sun: 07:00 - 22:00",
    },
    default: {
        name: "Unknown Venue",
        description: "Information not available",
        rating: 0,
        reviews: 0,
        price: "$0",
        type: "Standard",
        image: "",
        facilities: [],
    },
};

export default function VenueDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const venue = (VENUE_DETAILS as Record<string, any>)[id as string] || VENUE_DETAILS["default"];

    return (
        <View className="flex-1 bg-slate-50">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Custom Header with Back Button */}
            <View 
                className="absolute top-0 left-0 right-0 z-50 flex-row items-center justify-between px-5"
                style={{ paddingTop: insets.top + 12 }}
            >
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-white/95 backdrop-blur-xl rounded-full items-center justify-center shadow-lg"
                >
                    <ArrowLeft size={20} color="#1e293b" />
                </TouchableOpacity>
                <View className="bg-white/95 backdrop-blur-xl px-3 py-1.5 rounded-full flex-row items-center shadow-lg">
                    <Sparkles size={14} color="#2563eb" />
                    <Text className="text-slate-900 text-xs font-bold ml-1.5">{venue.type}</Text>
                </View>
            </View>

            <ScrollView 
                className="flex-1" 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Hero Image with Gradient Overlay */}
                <View className="relative h-80">
                    <Image
                        source={{ uri: venue.image }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    <View className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Floating Info Card */}
                    <View className="absolute bottom-0 left-0 right-0 px-5 pb-6">
                        <View className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-2xl border border-white/20">
                            <View className="flex-row items-start justify-between mb-3">
                                <View className="flex-1 mr-4">
                                    <Text className="text-slate-900 font-extrabold text-2xl leading-tight mb-2">
                                        {venue.name}
                                    </Text>
                                    <View className="flex-row items-center mb-1">
                                        <MapPin size={14} color="#64748b" />
                                        <Text className="text-slate-500 text-sm ml-1.5 font-medium flex-1" numberOfLines={1}>
                                            {venue.address}
                                        </Text>
                                    </View>
                                    <Text className="text-blue-600 text-sm font-semibold">
                                        {venue.distance}
                                    </Text>
                                </View>
                                <View className="bg-blue-600 px-4 py-2.5 rounded-2xl shadow-lg shadow-blue-200">
                                    <View className="flex-row items-center">
                                        <Star size={14} color="white" fill="white" />
                                        <Text className="text-white font-extrabold text-lg ml-1.5">
                                            {venue.rating}
                                        </Text>
                                    </View>
                                    <Text className="text-blue-100 text-xs font-medium text-center mt-0.5">
                                        {venue.reviews} reviews
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Gallery Preview */}
                {venue.gallery && venue.gallery.length > 1 && (
                    <View className="px-5 mt-6">
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            className="-mx-5 px-5"
                        >
                            <View className="flex-row gap-3">
                                {venue.gallery.slice(1).map((img: string, index: number) => (
                                    <Image
                                        key={index}
                                        source={{ uri: img }}
                                        className="w-32 h-24 rounded-2xl bg-slate-200"
                                        resizeMode="cover"
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                )}

                {/* Quick Info Cards */}
                <View className="px-5 mt-6">
                    <View className="flex-row gap-3">
                        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                            <View className="bg-blue-50 w-10 h-10 rounded-full items-center justify-center mb-2">
                                <Clock size={18} color="#2563eb" />
                            </View>
                            <Text className="text-slate-500 text-xs font-medium mb-0.5">Surface</Text>
                            <Text className="text-slate-900 font-bold text-sm">{venue.surface}</Text>
                        </View>
                        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                            <View className="bg-green-50 w-10 h-10 rounded-full items-center justify-center mb-2">
                                <Users size={18} color="#16a34a" />
                            </View>
                            <Text className="text-slate-500 text-xs font-medium mb-0.5">Capacity</Text>
                            <Text className="text-slate-900 font-bold text-sm">{venue.capacity}</Text>
                        </View>
                        <View className="flex-1 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                            <View className="bg-amber-50 w-10 h-10 rounded-full items-center justify-center mb-2">
                                <Calendar size={18} color="#d97706" />
                            </View>
                            <Text className="text-slate-500 text-xs font-medium mb-0.5">Open</Text>
                            <Text className="text-slate-900 font-bold text-sm">Daily</Text>
                        </View>
                    </View>
                </View>

                {/* Description Section */}
                <View className="px-5 mt-6">
                    <View className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <Text className="text-slate-900 font-bold text-lg mb-3">About this venue</Text>
                        <Text className="text-slate-600 leading-6 mb-4">
                            {venue.description}
                        </Text>
                        <View className="bg-blue-50 p-3 rounded-xl flex-row items-center border border-blue-100">
                            <Clock size={16} color="#2563eb" />
                            <Text className="text-blue-900 text-sm font-semibold ml-2">
                                {venue.openingHours}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Facilities Section */}
                <View className="px-5 mt-6">
                    <View className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <Text className="text-slate-900 font-bold text-lg mb-4">Facilities & Amenities</Text>
                        <View className="flex-row flex-wrap gap-3">
                            {venue.facilities.map((item: any, index: number) => (
                                <View
                                    key={index}
                                    className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 flex-row items-center"
                                >
                                    <View className="bg-white p-2 rounded-lg mr-3">
                                        <item.icon size={18} color="#2563eb" />
                                    </View>
                                    <Text className="text-slate-700 font-semibold text-sm">{item.label}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Location Card */}
                <View className="px-5 mt-6">
                    <View className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <View className="flex-row items-center justify-between mb-3">
                            <Text className="text-slate-900 font-bold text-lg">Location</Text>
                            <TouchableOpacity className="bg-blue-50 px-3 py-1.5 rounded-lg">
                                <Text className="text-blue-600 font-semibold text-xs">Get Directions</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="bg-slate-100 h-40 rounded-2xl items-center justify-center">
                            <MapPin size={32} color="#94a3b8" />
                            <Text className="text-slate-400 text-sm mt-2">Map view</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Bottom CTA Bar - Enhanced */}
            <View
                className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-2xl"
                style={{ paddingBottom: Math.max(insets.bottom, 16) }}
            >
                <View className="px-5 pt-4">
                    <View className="flex-row justify-between items-center mb-3">
                        <View>
                            <Text className="text-slate-500 text-sm font-medium">Price per hour</Text>
                            <Text className="text-blue-600 font-extrabold text-3xl">
                                {venue.price}
                                <Text className="text-slate-400 text-lg font-semibold">/hr</Text>
                            </Text>
                        </View>
                        <View className="bg-green-50 px-3 py-2 rounded-xl border border-green-100">
                            <View className="flex-row items-center">
                                <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                                <Text className="text-green-700 font-bold text-sm">Available Now</Text>
                            </View>
                        </View>
                    </View>
                    <Button 
                        size="lg" 
                        onPress={() => router.push(`/booking/${id}`)}
                        className="w-full rounded-xl shadow-lg shadow-blue-200"
                    >
                        <View className="flex-row items-center justify-center">
                            <Calendar size={20} color="white" />
                            <Text className="text-white font-bold text-base ml-2">Book This Venue</Text>
                        </View>
                    </Button>
                </View>
            </View>
        </View>
    );
}