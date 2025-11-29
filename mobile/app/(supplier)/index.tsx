import {
  View,
  Text,
  FlatList,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
// Remove SafeAreaView here because ImageBackground usually needs to go to the very top edge
// We will use padding or a SafeAreaView *inside* instead if needed, or just handle top padding manually.
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import HomeCarousel from "@/components/FeaturedCarousel";
import CategoryPills from "@/components/CategoryPills";
import ProductCard from "@/components/Ricently";
import FarmerCard from "@/components/FarmerCard";

import products from "@/lib/products";
import farmers from "@/lib/farmers";
import { router } from "expo-router";

export default function Index() {
  const [searchText, setSearchText] = useState("");

  return (
    <View className="flex-1 bg-[#F6F8FA]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        // Important: Remove 'mt-5' or top margins on the scrollview so the image touches the top
        className="flex-1"
      >
        {/* 1. ImageBackground MUST wrap the content you want 'on top' of the image.
          2. It needs dimensions (width/height or padding).
        */}
        <ImageBackground
          source={require("../../assets/images/Frame3384411.png")}
          className="w-full pb-6 pt-12" // Add padding-top (pt-12) to account for status bar
          resizeMode="cover"
        >
          {/* Header and SearchBar are now CHILDREN of ImageBackground */}
          <View className="px-4">
            <Header />

            <View className="mt-4">
              <SearchBar
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search fresh products..."
                onPress={() => router.push("./search")}
              />
            </View>
          </View>
        </ImageBackground>

        {/* The rest of your content continues below the background image */}
        <View className="px-4 mt-6">
          <HomeCarousel />
        </View>

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
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
