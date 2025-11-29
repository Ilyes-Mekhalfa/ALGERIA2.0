// In app/_layout.tsx

import { Stack } from "expo-router";
import { AuthProvider, useProtectedRoute } from "../providers/AuthProvider";
import "./global.css";

// This is the main component that will be rendered
const RootLayoutNav = () => {
  // --- CALL THE PROTECTED ROUTE HOOK ---
  // This hook will handle all the redirection logic automatically.
  useProtectedRoute();
  // ------------------------------------

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(farmer)" />
      <Stack.Screen name="(supplier)" />
      {/* <Stack.Screen name="products/[id]" /> */}
    </Stack>
  );
};

// This is the root component that wraps everything
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
