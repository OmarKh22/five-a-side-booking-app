import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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
        <MapView
            style={{ width: '100%', height: '100%' }}
            initialRegion={{
                latitude: coordinates?.latitude || 40.7128,
                longitude: coordinates?.longitude || -74.0060,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
            {coordinates && (
                <Marker
                    coordinate={coordinates}
                    title={displayName}
                    description={displayAddress}
                >
                    <View className="bg-blue-600 p-2 rounded-full border-2 border-white shadow-lg">
                        <MapPin size={20} color="white" />
                    </View>
                </Marker>
            )}
        </MapView>
    );
}
