import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const HomeGrid = ({ title, value }: any) => {
  return (
    // ✅ CHANGED: Removed 'w-[48%]' and 'mb-4'
    // Added 'w-full' so it stretches to fill the flex-1 container from the parent
    <View className="w-full bg-white border border-gray-200 rounded-xl p-4">
      <Text className="text-gray-500">{title}</Text>

      <Text className="text-xl font-semibold mt-1">{value}</Text>

      <View className="flex-row items-center mt-2">
        <Feather name="trending-up" size={18} color="green" />
        <Text className="text-green-500 ml-1 text-sm">8.5%</Text>
      </View>
    </View>
  );
};

export default HomeGrid;
