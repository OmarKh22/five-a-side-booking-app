import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { MapPin, Search, SlidersHorizontal, Star } from "lucide-react-native";
import { Input } from "../../components/ui/Input";

const FEATURED_VENUES = [
    { id: '1', name: 'Downtown Arena', rating: 4.8, image: 'https://as1.ftcdn.net/jpg/02/23/57/72/1000_F_223577247_DIyymsYzlK5U6Bu3T3ZJWauaVboyU2rY.jpg' },
    { id: '2', name: 'Westside Keepers', rating: 4.5, image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=600&auto=format&fit=crop' },
];

const NEARBY_VENUES = [
    { id: '3', name: 'Community Center', distance: '0.8 km', price: '$40/hr', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop' },
    { id: '4', name: 'School Grounds', distance: '1.2 km', price: '$30/hr', image: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=600&auto=format&fit=crop' },
    { id: '5', name: 'Rooftop Pitch', distance: '2.5 km', price: '$60/hr', image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop' },
];

const CATEGORIES = ["All", "Indoor", "Outdoor", "Grass", "Turf"];

export default function DiscoveryScreen() {
    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            {/* Header Section */}
            <View className="px-6 pt-2 pb-6 bg-white shadow-sm z-10">
                <View className="flex-row items-center justify-between mb-6">
                    <View>
                        <Text className="text-gray-400 text-sm font-medium">Welcome back,</Text>
                        <Text className="text-3xl font-extrabold text-slate-900">Find your pitch</Text>
                    </View>
                    <TouchableOpacity className="bg-slate-50 p-3 rounded-full border border-slate-100">
                        {/* @ts-ignore */}
                        <SlidersHorizontal size={20} className="text-slate-900" />
                    </TouchableOpacity>
                </View>

                <View className="relative">
                    <View className="absolute left-4 top-3 z-10">
                        {/* @ts-ignore */}
                        <Search size={20} className="text-slate-400" />
                    </View>
                    <Input
                        className="pl-12 h-12 bg-slate-50 border-slate-200 rounded-2xl text-base"
                        placeholder="Search venues, locations..."
                        placeholderTextColor="#94a3b8"
                    />
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Categories */}
                <View className="pt-6">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }} className="mb-8">
                        {CATEGORIES.map((cat, index) => (
                            <TouchableOpacity
                                key={cat}
                                className={`px-6 py-2.5 rounded-full mr-3 ${index === 0 ? 'bg-blue-600 shadow-lg shadow-blue-200' : 'bg-white border border-slate-200'}`}
                            >
                                <Text className={`font-semibold ${index === 0 ? 'text-white' : 'text-slate-600'}`}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Featured Section */}
                <View className="mb-8">
                    <View className="flex-row items-center justify-between px-6 mb-4">
                        <Text className="text-xl font-bold text-slate-900">Featured Venues</Text>
                        <Link href="/(tabs)/bookings" asChild>
                            <TouchableOpacity>
                                <Text className="text-blue-600 font-semibold">See All</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
                        {FEATURED_VENUES.map((venue) => (
                            <Link href={`/venue/${venue.id}`} key={venue.id} asChild>
                                <TouchableOpacity className="w-80 h-52 mr-5 bg-slate-200 rounded-3xl overflow-hidden shadow-sm relative active:scale-95 transition-transform">
                                    <Image source={{ uri: venue.image }} className="w-full h-full absolute" resizeMode="cover" />
                                    <View className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                    <View className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex-row items-center">
                                        {/* @ts-ignore */}
                                        <Star size={14} color="#fbbf24" fill="#fbbf24" />
                                        <Text className="text-slate-900 text-xs font-bold ml-1">{venue.rating}</Text>
                                    </View>

                                    <View className="absolute bottom-0 w-full p-5">
                                        <Text className="text-white font-bold text-xl mb-1">{venue.name}</Text>
                                        <View className="flex-row items-center">
                                            {/* @ts-ignore */}
                                            <MapPin size={14} color="rgba(255,255,255,0.8)" />
                                            <Text className="text-white/80 ml-1.5 text-sm font-medium">1.2 km away</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Link>
                        ))}
                    </ScrollView>
                </View>

                {/* Nearby List */}
                <View className="px-6">
                    <Text className="text-xl font-bold text-slate-900 mb-4">Nearby Courts</Text>
                    {NEARBY_VENUES.map((venue) => (
                        <Link href={`/venue/${venue.id}`} key={venue.id} asChild>
                            <TouchableOpacity className="bg-white rounded-2xl mb-4 p-3 border border-slate-100 flex-row shadow-sm items-center active:bg-slate-50">
                                <Image source={{ uri: venue.image }} className="w-24 h-24 rounded-xl bg-slate-200" resizeMode="cover" />
                                <View className="ml-4 flex-1 h-24 justify-center">
                                    <View className="flex-row justify-between items-start">
                                        <View className="flex-1 mr-2">
                                            <Text className="text-lg font-bold text-slate-900 leading-tight" numberOfLines={1}>{venue.name}</Text>
                                            <View className="flex-row items-center mt-1.5">
                                                {/* @ts-ignore */}
                                                <MapPin size={14} className="text-slate-400" />
                                                <Text className="text-slate-500 text-sm ml-1 font-medium">{venue.distance}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View className="flex-row items-center justify-between mt-3">
                                        <Text className="text-blue-600 font-bold text-lg">{venue.price}</Text>
                                        <View className="bg-blue-50 px-3 py-1 rounded-full">
                                            <Text className="text-blue-700 text-xs font-bold">Book</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
