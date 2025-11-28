import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

const Index = () => {
  return (
    <SafeAreaView>
      <Header />
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-3xl font-bold">Dashboard</Text>

        <TouchableOpacity className="flex-row items-center bg-green-500 px-4 py-2 rounded-full">
          <Ionicons name="add" size={20} color="#fff" />
          <Text className="text-white font-semibold ml-1">Add Product</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;
