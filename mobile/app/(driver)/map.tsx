import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { ChevronLeft, CornerUpRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// --- MOCK DATA FOR ROUTE ---
const CURRENT_LOCATION = { latitude: 36.735, longitude: 3.085 };
const DESTINATION = { latitude: 36.765, longitude: 3.12 };

// A simple mock path between the two points
const ROUTE_COORDINATES = [
  CURRENT_LOCATION,
  { latitude: 36.745, longitude: 3.095 },
  { latitude: 36.755, longitude: 3.105 },
  DESTINATION,
];

const INITIAL_REGION = {
  latitude: (CURRENT_LOCATION.latitude + DESTINATION.latitude) / 2,
  longitude: (CURRENT_LOCATION.longitude + DESTINATION.longitude) / 2,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const MapScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <StatusBar barStyle="dark-content" />

      {/* 1. THE MAP */}
      <MapView
        provider={PROVIDER_GOOGLE} // Remove if testing on iOS with Apple Maps
        style={{ flex: 1 }}
        initialRegion={INITIAL_REGION}
        customMapStyle={[
          // Optional: Simple style to make the map look cleaner/lighter like the image
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] },
        ]}
      >
        {/* 2. THE ROUTE LINE */}
        <Polyline
          coordinates={ROUTE_COORDINATES}
          strokeColor="#C8A97E" // The golden-brown color from the image
          strokeWidth={5}
        />

        {/* 3. DESTINATION MARKER (Large Pin) */}
        <Marker coordinate={DESTINATION}>
          <View className="items-center justify-center">
            {/* Outer Pin Shape */}
            <View className="w-14 h-14 bg-[#C8A97E] rounded-full rounded-bl-none -rotate-45 items-center justify-center shadow-sm elevation-5">
              {/* Inner White Dot */}
              <View className="w-5 h-5 bg-white rounded-full rotate-45" />
            </View>
          </View>
        </Marker>

        {/* 4. CURRENT LOCATION MARKER (Circle with Halo) */}
        <Marker coordinate={CURRENT_LOCATION} anchor={{ x: 0.5, y: 0.5 }}>
          <View className="items-center justify-center">
            {/* Outer Halo */}
            <View className="w-20 h-20 bg-[#F3E5D2] rounded-full items-center justify-center opacity-50">
              {/* Inner Solid Circle */}
              <View className="w-8 h-8 bg-[#C8A97E] rounded-full border-2 border-white shadow-sm" />
            </View>
          </View>
        </Marker>
      </MapView>

      {/* --- OVERLAYS --- */}
      {/* We use SafeAreaView here to ensure the floating cards don't go under the notch */}
      <SafeAreaView className="absolute top-0 w-full px-5" edges={["top"]}>
        {/* 5. TOP HEADER CARD (Distance/Time) */}
        <View className="bg-white flex-row items-center justify-between p-4 rounded-2xl shadow-sm elevation-3 mb-4 mt-2">
          <TouchableOpacity onPress={() => router.back()} className="p-1">
            <ChevronLeft size={28} color="black" />
          </TouchableOpacity>

          <View className="flex-1 flex-row justify-between px-6">
            <Text className="text-xl font-extrabold text-black">12.5 KM</Text>
            <Text className="text-xl font-extrabold text-black">35 min</Text>
          </View>
        </View>

        {/* 6. NAVIGATION INSTRUCTION CARD */}
        <View className="bg-white flex-row items-center p-5 rounded-2xl shadow-sm elevation-3">
          <View className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mr-4 border-2 border-black">
            <CornerUpRight size={28} color="black" strokeWidth={2.5} />
          </View>
          <Text className="text-xl font-extrabold text-black">
            Turn right in 200m
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MapScreen;
