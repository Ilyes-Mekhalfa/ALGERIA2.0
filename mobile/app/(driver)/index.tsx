import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { SlidersHorizontal, Truck, MapPin } from "lucide-react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"; // 1. Import Map

const DriverHome = () => {
  // Mock Coordinates (e.g., Algiers/Blida region)
  const JOB_LOCATION = {
    latitude: 36.7525,
    longitude: 3.042,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F6F8FA]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HEADER */}
        <View className="px-5 pt-2">
          <Header />
        </View>

        {/* TITLE */}
        <View className="flex-row justify-between items-center px-5 mt-4 mb-6">
          <Text className="text-3xl font-extrabold text-black">Home</Text>
          <TouchableOpacity>
            <SlidersHorizontal size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* STATS GRID */}
        <View className="px-5 flex-row flex-wrap justify-between gap-y-4">
          <View className="w-[48%] bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
            <Text className="text-gray-400 text-xs mb-1 font-medium">
              Active Deliveries
            </Text>
            <Text className="text-xl font-bold text-black">3</Text>
          </View>
          <View className="w-[48%] bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
            <Text className="text-gray-400 text-xs mb-1 font-medium">
              Today&apos;s Earnings
            </Text>
            <Text className="text-xl font-bold text-black">3 320 DA</Text>
          </View>
          <View className="w-[48%] bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
            <View className="bg-blue-500 w-10 px-2 rounded mb-1" />
            <Text className="text-gray-400 text-xs mb-1 font-medium">
              Completed Today
            </Text>
            <Text className="text-xl font-bold text-black">12</Text>
          </View>
          <View className="w-[48%] bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
            <Text className="text-gray-400 text-xs mb-1 font-medium">
              Rating
            </Text>
            <Text className="text-xl font-bold text-black">4.8/5</Text>
          </View>
        </View>

        {/* ACTION BUTTON */}
        <View className="px-5 mt-6">
          <TouchableOpacity className="bg-[#4ADE80] py-4 rounded-full items-center shadow-lg shadow-green-200 active:bg-green-500">
            <Text className="text-white font-bold text-lg">
              Find New Deliveries
            </Text>
          </TouchableOpacity>
        </View>

        {/* ACTIVE JOBS SECTION */}
        <View className="px-5 mt-8">
          <Text className="text-xl font-bold text-black mb-4">Active Jobs</Text>

          {/* JOB CARD */}
          <View className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
            {/* Metrics Row */}
            <View className="flex-row justify-between items-center mb-6">
              <View className="items-center flex-1">
                <Text className="text-gray-400 text-[10px] uppercase font-bold mb-1">
                  ETA
                </Text>
                <Text className="text-black font-bold text-lg">18 min</Text>
              </View>
              <View className="h-8 w-[1px] bg-gray-200" />
              <View className="items-center flex-1">
                <Text className="text-gray-400 text-[10px] uppercase font-bold mb-1">
                  Distance
                </Text>
                <Text className="text-black font-bold text-lg">8.3 KM</Text>
              </View>
              <View className="h-8 w-[1px] bg-gray-200" />
              <View className="items-center flex-1">
                <Text className="text-gray-400 text-[10px] uppercase font-bold mb-1">
                  Status
                </Text>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-600 text-[10px] font-bold">
                    In transit
                  </Text>
                </View>
              </View>
            </View>

            {/* Job Info */}
            <View className="flex-row items-center mb-5">
              <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3">
                <Truck size={20} color="#EA580C" />
              </View>
              <View>
                <Text className="text-gray-400 text-xs font-medium">
                  ORD-AG-2025-5420
                </Text>
                <Text className="text-black font-bold text-lg leading-6">
                  Dairy Products Shipment
                </Text>
              </View>
            </View>

            {/* 2. REAL MAP VIEW */}
            <View className="h-44 w-full rounded-2xl overflow-hidden border border-gray-100 relative">
              <MapView
                provider={PROVIDER_GOOGLE} // Remove if using Apple Maps on iOS
                style={{ width: "100%", height: "100%" }}
                initialRegion={JOB_LOCATION}
                scrollEnabled={false} // Prevents getting stuck while scrolling page
                zoomEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
              >
                {/* Custom Marker */}
                <Marker coordinate={JOB_LOCATION}>
                  <View className="bg-green-500 p-2 rounded-full border-2 border-white shadow-sm">
                    <Truck size={16} color="white" />
                  </View>
                </Marker>
              </MapView>

              {/* Optional: "Open Map" Overlay Button */}
              <View className="absolute bottom-3 right-3">
                <TouchableOpacity className="bg-white p-2 rounded-full shadow-md">
                  <MapPin size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DriverHome;
