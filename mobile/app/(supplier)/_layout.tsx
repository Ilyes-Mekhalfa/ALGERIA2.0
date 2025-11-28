import React from "react";
import { Tabs } from "expo-router";
import CustomTabBar from "@/components/TabBar2"; // Make sure this path is correct

export default function TabLayout() {
  return (
    <>
      <Tabs
        // 1️⃣ Hides the default standard header (since you have custom headers in screens)
        screenOptions={{
          headerShown: false,
        }}
        // 2️⃣ Overrides the default Tab Bar with your Custom Reanimated one
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="search" />
        <Tabs.Screen name="orders" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </>
  );
}
