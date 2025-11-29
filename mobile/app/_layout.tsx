// In app/_layout.tsx

import { Slot, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../providers/AuthProvider";
import { useEffect, useCallback } from "react"; // 1. Added useCallback
import { ActivityIndicator, View } from "react-native";
import * as SplashScreen from "expo-splash-screen"; // 2. Added Splash Import
import "./global.css";

// 3. Prevent the splash screen from auto-hiding immediately
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // While we are checking for the user, do nothing.
    if (loading) {
      return;
    }

    // If the user is not logged in, redirect to the auth group.
    if (!user) {
      router.replace("/(auth)/login");
    }
    // If the user IS logged in, redirect to their role's group.
    else if (user.role) {
      router.replace(`/(driver)`); // Add more roles
    }
  }, [user, loading, router]);

  // 4. Create a callback to hide the splash screen once the app is NOT loading
  const onLayoutRootView = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);

  // While loading, show a spinner (Note: The Native Splash will actually cover this
  // until loading finishes, preventing any white screen flash).
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 5. Wrap the Slot in a View that triggers the onLayout event
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Slot />
    </View>
  );
};

// This is the root component that wraps everything
export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
