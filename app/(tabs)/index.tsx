import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { MapPin, Search, SlidersHorizontal, Star } from "lucide-react-native";
import { Input } from "../../components/ui/Input";

const FEATURED_VENUES = [
    { id: '1', name: 'Downtown Arena', rating: 4.8, image: 'https://images.unsplash.com/photo-1579952363873-27f3bde9be51?q=80&w=600&auto=format&fit=crop' },
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
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="px-4 py-2 bg-white border-b border-gray-100">
                <Text className="text-2xl font-bold text-blue-900">Find a Pitch</Text>
                <View className="flex-row items-center mt-4 mb-2 space-x-2">
                    <View className="flex-1 relative">
                        <Input className="pl-10 bg-gray-100 border-none" placeholder="Search venues..." />
                        {/* @ts-ignore */}
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </View>
                    <TouchableOpacity className="p-2.5 bg-blue-600 rounded-lg">
                        {/* @ts-ignore */}
                        <SlidersHorizontal size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 mb-6">
                    {CATEGORIES.map((cat, index) => (
                        <TouchableOpacity key={cat} className={`px-5 py-2 rounded-full mr-2 ${index === 0 ? 'bg-blue-600' : 'bg-white border border-gray-200'}`}>
                            <Text className={`font-medium ${index === 0 ? 'text-white' : 'text-gray-700'}`}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Featured Section */}
                <Text className="text-lg font-bold text-gray-900 mb-3">Featured Venues</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                    {FEATURED_VENUES.map((venue) => (
                        <Link href={`/venue/${venue.id}`} key={venue.id} asChild>
                            <TouchableOpacity className="w-72 h-44 mr-4 bg-gray-200 rounded-xl overflow-hidden relative">
                                <Image source={{ uri: venue.image }} className="w-full h-full absolute" resizeMode="cover" />
                                <View className="absolute bottom-0 w-full bg-black/40 p-3">
                                    <Text className="text-white font-bold text-lg">{venue.name}</Text>
                                    <View className="flex-row items-center">
                                        {/* @ts-ignore */}
                                        <Star size={16} color="#fbbf24" fill="#fbbf24" />
                                        <Text className="text-white ml-1 font-medium">{venue.rating}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    ))}
                </ScrollView>

                {/* Nearby List */}
                <Text className="text-lg font-bold text-gray-900 mb-3">Nearby</Text>
                {NEARBY_VENUES.map((venue) => (
                    <Link href={`/venue/${venue.id}`} key={venue.id} asChild>
                        <TouchableOpacity className="bg-white rounded-xl mb-4 p-3 border border-gray-100 flex-row shadow-sm">
                            <Image source={{ uri: venue.image }} className="w-24 h-24 rounded-lg bg-gray-200" resizeMode="cover" />
                            <View className="ml-4 flex-1 justify-center">
                                <Text className="text-lg font-bold text-gray-900">{venue.name}</Text>
                                <View className="flex-row items-center mt-1">
                                    {/* @ts-ignore */}
                                    <MapPin size={16} color="#6b7280" />
                                    <Text className="text-gray-500 text-sm ml-1">{venue.distance}</Text>
                                </View>
                                <Text className="text-blue-600 font-bold mt-2">{venue.price}</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
