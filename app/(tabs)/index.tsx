import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { MapPin, Search, SlidersHorizontal, Star, TrendingUp, Sparkles, ArrowRight } from "lucide-react-native";
import { Input } from "../../components/ui/Input";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const FEATURED_VENUES = [
    {
        id: '1',
        name: 'Downtown Arena',
        rating: 4.8,
        distance: '1.2 km',
        price: '$50/hr',
        image: 'https://as1.ftcdn.net/jpg/02/23/57/72/1000_F_223577247_DIyymsYzlK5U6Bu3T3ZJWauaVboyU2rY.jpg',
        featured: true,
        typeKey: 'premium'
    },
    {
        id: '2',
        name: 'Westside Keepers',
        rating: 4.5,
        distance: '2.1 km',
        price: '$45/hr',
        image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=600&auto=format&fit=crop',
        featured: true,
        typeKey: 'popular'
    },
];

const NEARBY_VENUES = [
    {
        id: '3',
        name: 'Community Center',
        distance: '0.8 km',
        price: '$40/hr',
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: '4',
        name: 'School Grounds',
        distance: '1.2 km',
        price: '$30/hr',
        rating: 4.1,
        image: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: '5',
        name: 'Rooftop Pitch',
        distance: '2.5 km',
        price: '$60/hr',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop'
    },
];

const CATEGORIES = [
    { id: 'all', nameKey: 'all', icon: '🏟️' },
    { id: 'indoor', nameKey: 'indoor', icon: '🏢' },
    { id: 'outdoor', nameKey: 'outdoor', icon: '🌳' },
    { id: 'grass', nameKey: 'grass', icon: '🌱' },
    { id: 'turf', nameKey: 'turf', icon: '⚡' }
];

export default function DiscoveryScreen() {
    const insets = useSafeAreaInsets();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { t } = useTranslation();

    return (
        <View className="flex-1 bg-slate-50">
            {/* Premium Header with Gradient */}
            <View
                className="bg-blue-600"
                style={{ paddingTop: insets.top }}
            >
                <View className="px-5 pb-6 pt-2">
                    <View className="flex-row items-center justify-between mb-6">
                        <View>
                            <Text className="text-blue-100 text-sm font-medium">{t('auth.appName')}</Text>
                            <Text className="text-white text-3xl font-extrabold mt-0.5">{t('tabs.discover')}</Text>
                        </View>
                        <TouchableOpacity className="bg-white/20 backdrop-blur-xl p-3 rounded-full">
                            <SlidersHorizontal size={22} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Enhanced Search Bar */}
                    <View className="relative">
                        <View className="absolute left-4 top-1/2 -mt-2.5 z-10">
                            <Search size={20} color="#94a3b8" />
                        </View>
                        <Input
                            className="pl-12 h-14 bg-white border-0 rounded-2xl text-base shadow-lg shadow-blue-900/20"
                            placeholder={t('discovery.searchPlaceholder')}
                            placeholderTextColor="#94a3b8"
                        />
                    </View>
                </View>
            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Categories - Improved Design */}
                <View className="pt-6 pb-2">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                    >
                        {CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                // onPress={() => setSelectedCategory(cat.id)}
                                className={`px-5 py-3 rounded-2xl mr-3 border-2 ${selectedCategory === cat.id
                                        ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-200'
                                        : 'bg-white border-slate-100'
                                    }`}
                            >
                                <View className="flex-row items-center">
                                    <Text className="text-base mr-1.5">{cat.icon}</Text>
                                    <Text className={`font-bold text-sm ${selectedCategory === cat.id ? 'text-white' : 'text-slate-700'
                                        }`}>
                                        {t(`discovery.categories.${cat.nameKey}`)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Featured Section - Enhanced Cards */}
                <View className="mb-8 mt-4">
                    <View className="flex-row items-center justify-between px-5 mb-4">
                        <View className="flex-row items-center">
                            <TrendingUp size={20} color="#2563eb" />
                            <Text className="text-xl font-bold text-slate-900 ml-2">{t('discovery.featuredVenues')}</Text>
                        </View>
                        <Link href="/(tabs)/bookings" asChild>
                            <TouchableOpacity className="flex-row items-center">
                                <Text className="text-blue-600 font-semibold mr-1">{t('common.viewAll')}</Text>
                                <ArrowRight size={16} color="#2563eb" />
                            </TouchableOpacity>
                        </Link>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                    >
                        {FEATURED_VENUES.map((venue) => (
                            <Link href={`/venue/${venue.id}`} key={venue.id} asChild>
                                <TouchableOpacity className="w-80 mr-4 bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 active:scale-95">
                                    {/* Image Section */}
                                    <View className="relative h-48">
                                        <Image
                                            source={{ uri: venue.image }}
                                            className="w-full h-full"
                                            resizeMode="cover"
                                        />
                                        <View className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                        {/* Top Badges */}
                                        <View className="absolute top-4 left-4 right-4 flex-row justify-between">
                                            <View className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex-row items-center">
                                                <Sparkles size={12} color="#2563eb" />
                                                <Text className="text-slate-900 text-xs font-bold ml-1.5">
                                                    {t(`discovery.${venue.typeKey}`)}
                                                </Text>
                                            </View>
                                            <View className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex-row items-center">
                                                <Star size={12} color="#fbbf24" fill="#fbbf24" />
                                                <Text className="text-slate-900 text-xs font-bold ml-1">
                                                    {venue.rating}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Bottom Info */}
                                        <View className="absolute bottom-4 left-4 right-4">
                                            <Text className="text-white font-bold text-xl mb-1">
                                                {venue.name}
                                            </Text>
                                            <View className="flex-row items-center">
                                                <MapPin size={14} color="rgba(255,255,255,0.9)" />
                                                <Text className="text-white/90 ml-1.5 text-sm font-medium">
                                                    {venue.distance}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Price Section */}
                                    <View className="px-4 py-4 flex-row items-center justify-between bg-gradient-to-b from-slate-50 to-white">
                                        <View>
                                            <Text className="text-slate-500 text-xs font-medium mb-0.5">
                                                {t('venue.pricePerHour')}
                                            </Text>
                                            <Text className="text-blue-600 font-extrabold text-xl">
                                                {venue.price}
                                            </Text>
                                        </View>
                                        <View className="bg-blue-600 px-5 py-2.5 rounded-xl shadow-lg shadow-blue-200">
                                            <Text className="text-white text-sm font-bold">{t('venue.bookThisVenue')}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Link>
                        ))}
                    </ScrollView>
                </View>

                {/* Nearby List - Card Style */}
                <View className="px-5">
                    <View className="flex-row items-center mb-4">
                        <MapPin size={20} color="#2563eb" />
                        <Text className="text-xl font-bold text-slate-900 ml-2">{t('discovery.nearYou')}</Text>
                    </View>

                    {NEARBY_VENUES.map((venue, index) => (
                        <Link href={`/venue/${venue.id}`} key={venue.id} asChild>
                            <TouchableOpacity
                                className="bg-white rounded-2xl mb-4 overflow-hidden border border-slate-100 shadow-sm active:scale-98"
                            >
                                <View className="flex-row">
                                    {/* Image */}
                                    <View className="relative">
                                        <Image
                                            source={{ uri: venue.image }}
                                            className="w-28 h-28"
                                            resizeMode="cover"
                                        />
                                        {/* Rating Badge */}
                                        <View className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-md px-2 py-1 rounded-full flex-row items-center">
                                            <Star size={10} color="#fbbf24" fill="#fbbf24" />
                                            <Text className="text-slate-900 text-xs font-bold ml-1">
                                                {venue.rating}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Content */}
                                    <View className="flex-1 p-4 justify-between">
                                        <View>
                                            <Text
                                                className="text-slate-900 font-bold text-base leading-tight mb-2"
                                                numberOfLines={1}
                                            >
                                                {venue.name}
                                            </Text>
                                            <View className="flex-row items-center">
                                                <MapPin size={14} color="#94a3b8" />
                                                <Text className="text-slate-500 text-sm ml-1 font-medium">
                                                    {venue.distance}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Bottom Row */}
                                        <View className="flex-row items-center justify-between mt-2">
                                            <Text className="text-blue-600 font-extrabold text-lg">
                                                {venue.price}
                                            </Text>
                                            <View className="bg-blue-600 px-4 py-1.5 rounded-lg">
                                                <Text className="text-white text-xs font-bold">{t('booking.bookVenue')}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    ))}
                </View>

                {/* Bottom Spacing */}
                <View className="h-6" />
            </ScrollView>
        </View>
    );
}