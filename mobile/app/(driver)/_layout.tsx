import React from "react";
import { Tabs } from "expo-router";
import CustomTabBar from "@/components/driverNav"; // Make sure this path is correct

export default function TabLayout() {
  return (
    <Tabs
      // 1️⃣ Hides the default standard header (since you have custom headers in screens)
      screenOptions={{
        headerShown: false,
      }}
      // 2️⃣ Overrides the default Tab Bar with your Custom Reanimated one
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {/* 📌 Tab 1: Dashboard (Mapped to "index" in CustomTabBar) */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      {/* 📌 Tab 2: Products (Mapped to "products" in CustomTabBar) */}
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
        }}
      />

      {/* 📌 Tab 3: Analytics (Mapped to "analytics" in CustomTabBar) */}
      <Tabs.Screen
        name="jobs"
        options={{
          title: "Jobs",
        }}
      />

      <Tabs.Screen
        name="earnings"
        options={{
          title: "earnings",
        }}
      />
    </Tabs>
  );
}
