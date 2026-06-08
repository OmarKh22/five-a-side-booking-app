import React from 'react';
import { View, Text } from 'react-native';
import { MapPin } from 'lucide-react-native';

interface VenueMapProps {
    coordinates: {
        latitude: number;
        longitude: number;
    };
    displayName: string;
    displayAddress: string;
}

export default function VenueMap({ coordinates, displayName, displayAddress }: VenueMapProps) {
    return (
        <View className="w-full h-full bg-slate-50 items-center justify-center p-6">
            <View className="bg-blue-50 p-4 rounded-full mb-3 border border-blue-100 shadow-sm">
                <MapPin size={32} color="#2563eb" />
            </View>
            <Text className="text-slate-900 font-extrabold text-base text-center mb-1">{displayName}</Text>
            <Text className="text-slate-500 text-sm text-center font-medium max-w-[280px] mb-2">{displayAddress}</Text>
            {coordinates && (
                <Text className="text-slate-400 text-xs font-mono bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    Lat: {coordinates.latitude.toFixed(4)}, Lng: {coordinates.longitude.toFixed(4)}
                </Text>
            )}
        </View>
    );
}
