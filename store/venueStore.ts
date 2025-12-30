import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export interface Venue {
    id: number;
    name: string;
    description: string;
    price: string;
    rating: number;
    reviews: number;
    image: string;
    address: string;
    distance: string;
    type: string;
    facilities: any[];
    latitude: number;
    longitude: number;
}

interface VenueState {
    venues: Venue[];
    loading: boolean;
    error: string | null;
    fetchVenues: () => Promise<void>;
}

export const useVenueStore = create<VenueState>((set) => ({
    venues: [],
    loading: false,
    error: null,
    fetchVenues: async () => {
        set({ loading: true, error: null });
        try {
            const { data, error } = await supabase
                .from('venues')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;

            set({ venues: data as Venue[], loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },
}));
