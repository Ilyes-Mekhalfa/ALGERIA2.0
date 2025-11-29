// In app/_layout.tsx

import { Slot } from "expo-router";
import { AuthProvider, useAuth } from "../providers/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import "./global.css";

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
      router.replace(`/${user.role === "farmer" ? "(farmer)" : "(supplier)"}`); // Add more roles
    }
  }, [user, loading, router]);

  // While loading, show a spinner. If not loading, <Slot /> will render
  // the correct page (either from the (auth) group or a tab group).
  return loading ? (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <Slot />
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
