import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import HomeCarousel from "@/components/FeaturedCarousel";
import CategoryPills from "@/components/CategoryPills";
import ProductCard from "@/components/ProductCard";
import FarmerCard from "@/components/FarmerCard";

// Import the real data files we create below
import products from "@/lib/products";
import farmers from "@/lib/farmers";

export default function Index() {
  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-[#F6F8FA] mt-5">
      <ScrollView
        showsVerticalScrollIndicator={false}
        // 👇 This adds the spacing at the very bottom of the page
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Header />

        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search fresh products..."
        />

        <HomeCarousel />

        {/* Categories */}
        <View className="mt-6">
          <Text className="text-lg font-semibold px-4 text-black mb-4">
            Shop By Categories
          </Text>
          <CategoryPills />
        </View>

        {/* Recently Listed */}
        <View className="mt-7">
          <View className="flex-row justify-between items-center px-4 mb-3">
            <Text className="text-lg font-semibold text-black">
              Recently Listed
            </Text>
            <Text className="text-[#64C27B] font-medium">View all</Text>
          </View>

          <FlatList
            data={products}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard item={item} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </View>

        {/* Best Farmers */}
        <View className="mt-7">
          <View className="flex-row justify-between items-center px-4 mb-3">
            <Text className="text-lg font-semibold text-black">
              Best Farmers
            </Text>
            <Text className="text-[#64C27B] font-medium">View all</Text>
          </View>

          <FlatList
            data={farmers}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <FarmerCard item={item} />}
            showsHorizontalScrollIndicator={false}
            // 👇 Extra padding prevents shadows from clipping
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
