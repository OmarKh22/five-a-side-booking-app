import { create } from 'zustand';

export interface Booking {
    id: string;
    venueId: string;
    venueName: string;
    date: string;
    time: string;
    price: number;
    status: 'pending' | 'confirmed' | 'cancelled';
}

interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: 'player' | 'owner';
}

interface BookingState {
    user: UserProfile | null;
    bookings: Booking[];
    isAuthenticated: boolean;
    login: (user: UserProfile) => void;
    logout: () => void;
    addBooking: (booking: Booking) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    user: null,
    bookings: [],
    isAuthenticated: false,
    login: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
    addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
}));
