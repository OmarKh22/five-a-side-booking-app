import { Redirect } from "expo-router";
import { useBookingStore } from "../store/bookingStore";

export default function Index() {
    const isAuthenticated = useBookingStore((state) => state.isAuthenticated);

    if (isAuthenticated) {
        return <Redirect href="/(tabs)" />;
    }

    return <Redirect href="/(auth)/login" />;
}
