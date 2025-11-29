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
    if (loading) {
      return;
    }

    if (!user) {
      router.replace("/(auth)/login");
    } else if (user.role) {
      // --- THIS IS THE UPDATED REDIRECTION LOGIC ---
      if (user.role === "farmer") {
        router.replace("/(farmer)");
      } else if (user.role === "buyer") {
        router.replace("/(supplier)");
      } else if (user.role === "transporter") { // Assuming 'delivery' is the role name for transporter
        router.replace("/(driver)");
      } else {
        // Fallback for any other roles or if a role doesn't have a dedicated route
        router.replace("/(auth)/login");
      }
      // ---------------------------------------------
    }
  }, [user, loading, router]);

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <Slot />
  );
};

// This root component remains the same
export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
