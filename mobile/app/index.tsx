// In app/index.js

import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider"; // Adjust path if necessary

const Index = () => {
  const { user, loading } = useAuth();
  console.log(user);

  // 1. While the AuthProvider is checking for a token, show a loading spinner.
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 2. If loading is done and there is NO user, redirect to the login screen.
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  // 3. If loading is done AND there IS a user, check their role and redirect.
  if (user.role === "farmer") {
    return <Redirect href="/(farmer)" />;
  }

  if (user.role === "buyer") {
    return <Redirect href="/(supplier)" />;
  }

  // Fallback: If the user has an unknown role, send them to a default place.
  // For now, we can send them back to login.
  return <Redirect href="/(auth)/login" />;
};

export default Index;
