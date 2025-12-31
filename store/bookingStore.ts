import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export interface Booking {
    id?: string; // Optional for new bookings as DB generates it
    venue_id: number;
    user_id: string;
    date: string;
    time_slot: string;
    amount: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at?: string;
    venues?: {
        name: string;
        address: string;
    };
}

interface BookingState {
    bookings: Booking[];
    loading: boolean;
    error: string | null;
    fetchUserBookings: () => Promise<void>;
    addBooking: (booking: Omit<Booking, 'id' | 'created_at' | 'status' | 'user_id'>) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set, get) => ({
    bookings: [],
    loading: false,
    error: null,

    fetchUserBookings: async () => {
        set({ loading: true, error: null });
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            const { data, error } = await supabase
                .from('bookings')
                .select(`
                    *,
                    venues (
                        name,
                        address
                    )
                `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            set({ bookings: data as Booking[], loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addBooking: async (booking) => {
        set({ loading: true, error: null });
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            const newBooking = {
                ...booking,
                user_id: user.id,
                status: 'confirmed'
            };

            const { data, error } = await supabase
                .from('bookings')
                .insert(newBooking)
                .select()
                .single();

            if (error) throw error;

            // Optimistically update or re-fetch
            const currentBookings = get().bookings;
            set({
                bookings: [data as Booking, ...currentBookings],
                loading: false
            });
        } catch (error: any) {
            set({ error: error.message, loading: false });
            throw error; // Re-throw to handle in UI
        }
    },
}));
