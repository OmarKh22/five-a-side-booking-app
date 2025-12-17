import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { MapPin, Wifi, Car, Star, Clock, CheckCircle } from "lucide-react-native";
import { Button } from "../../components/ui/Button";

// Mock data
const VENUE_DETAILS: Record<string, any> = {
  "1": {
    name: "Downtown Arena",
    description:
      "Premier 5-a-side facility with floodlights and changing rooms.",
    rating: 4.8,
    price: "$50/hr",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bde9be51?q=80&w=600&auto=format&fit=crop",
  },
  default: {
    name: "Unknown Venue",
    description: "Information not available",
    rating: 0,
    price: "$0/hr",
    image: "",
  },
};

export default function VenueDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const venue =
    (VENUE_DETAILS as Record<string, any>)[id as string] ||
    VENUE_DETAILS["default"];

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: venue.name,
          headerTintColor: "#111827",
        }}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View className="relative">
          <Image
            source={{ uri: venue.image }}
            className="w-full h-72"
            resizeMode="cover"
          />

          {/* Rating */}
          <View className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex-row items-center shadow">
            {/* @ts-ignore */}
            <Star size={16} color="#2563eb" fill="#2563eb" />
            <Text className="ml-1 font-bold text-gray-900">
              {venue.rating}
            </Text>
          </View>

          {/* Title */}
          <View className="absolute bottom-4 left-4 right-4">
            <Text className="text-2xl font-bold text-white">
              {venue.name}
            </Text>
            <View className="flex-row items-center mt-1">
              {/* @ts-ignore */}
              <MapPin size={16} color="white" />
              <Text className="ml-1 text-white opacity-90">
                123 Football St, City Center
              </Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="p-6">
          <Text className="text-gray-600 leading-7 mb-6">
            {venue.description}
          </Text>

          {/* Facilities */}
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Facilities
          </Text>

          <View className="flex-row flex-wrap gap-3">
            {[
              { icon: Wifi, label: "Free WiFi" },
              { icon: Car, label: "Parking" },
              { icon: CheckCircle, label: "Showers" },
            ].map((item, index) => (
              <View
                key={index}
                className="flex-row items-center bg-gray-100 px-4 py-2 rounded-xl"
              >
                {/* @ts-ignore */}
                <item.icon size={18} color="#374151" />
                <Text className="ml-2 text-gray-800">{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View className="absolute bottom-0 w-full bg-white border-t border-gray-200 p-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-gray-500">Price per hour</Text>
          <Text className="text-2xl font-bold text-blue-600">
            {venue.price}
          </Text>
        </View>
        <Button size="lg" onPress={() => router.push(`/booking/${id}`)}>
          Book Now
        </Button>
      </View>
    </View>
  );
}
