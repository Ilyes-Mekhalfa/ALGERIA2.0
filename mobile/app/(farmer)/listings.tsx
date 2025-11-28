import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import productData from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
const filterTabs = ["Active", "Draft", "Completed"];

const Listings = () => {
  const [activeTab, setActiveTab] = useState("Active");
  return (
    <SafeAreaView className="flex-1 bg-[#F4FDF6]">
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={productData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          // We use flex-1 here so the ProductCard component fills the column space
          <View className="flex-1 mb-4">
            <ProductCard item={item} />
          </View>
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        columnWrapperStyle={{ gap: 16 }}
        ListHeaderComponent={
          <>
            <Header />
            <View className="flex-row justify-evenly items-center mt-6 mb-8">
              <Text className="text-3xl font-extrabold">Products</Text>
              <TouchableOpacity className="flex-row items-center bg-[#50C878] px-5 py-3 rounded-full">
                <Ionicons name="add" size={22} color="#fff" />
                <Text className="text-white font-semibold ml-1 text-lg">
                  Add Product
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between px-2">
              {filterTabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    // Conditional styling based on active state
                    className={`px-8 py-3 rounded-full ${
                      isActive
                        ? "bg-[#FCD27B]"
                        : "border-2 border-[#FCD27B] bg-[#FFFDF5]"
                    }`}
                  >
                    <Text
                      className={`font-bold ${
                        isActive ? "text-white" : "text-[#FCD27B]"
                      }`}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Listings;
