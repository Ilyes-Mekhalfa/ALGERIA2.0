import {
  View,
  Text,
  FlatList,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";

import { useAuth } from "@/providers/AuthProvider";
import recommendationService from "../../services/remmendationServices"; // Corrected spelling

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import HomeCarousel from "@/components/FeaturedCarousel";
import CategoryPills from "@/components/CategoryPills";
import ProductCard from "@/components/Ricently"; // This now points to your new card
import FarmerCard from "@/components/FarmerCard";

import products from "@/lib/products"; // Mock data for "Recently Listed"
import farmers from "@/lib/farmers";
import CustomCard from "@/components/CustomCard";

export default function Index() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const { user } = useAuth();

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [errorRecs, setErrorRecs] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoadingRecs(false);
      return;
    }

    const fetchRecommendations = async () => {
      setLoadingRecs(true);
      setErrorRecs(null);
      try {
        const userLocation = user.wilaya || "algiers";
        const criteria = {
          wilaya: userLocation,
          min_quantity: 1,
          count: 10,
        };

        const response =
          await recommendationService.getUserRecommendations(criteria);

        // --- THIS IS THE FIX ---
        // Your data is nested inside a 'data' property in the response.
        console.log(response);
        setRecommendedProducts(response || []);
        // -----------------------
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
        setErrorRecs("Could not load recommendations.");
      } finally {
        setLoadingRecs(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  const renderRecommendedList = () => {
    if (loadingRecs) {
      return (
        <ActivityIndicator size="large" color="#64C27B" className="h-48" />
      );
    }
    if (errorRecs) {
      return (
        <Text className="text-center text-red-500 h-48 px-4">{errorRecs}</Text>
      );
    }
    return (
      <FlatList
        data={recommendedProducts}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <CustomCard item={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListEmptyComponent={
          <Text className="text-center text-gray-500">
            No recommendations for you yet.
          </Text>
        }
      />
    );
  };

  return (
    <View className="flex-1 bg-[#F6F8FA]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="flex-1"
      >
        {/* --- Header & Other Sections (No change) --- */}
        <ImageBackground
          source={require("../../assets/images/Frame3384411.png")}
          className="w-full pb-6 pt-12"
          resizeMode="cover"
        >
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
        <Text className="text-2xl font-bold ml-4">Most Popular</Text>
        <View className="px-4 mt-2">
          <HomeCarousel />
        </View>
        <View className="mt-6">
          <Text className="text-lg font-semibold px-4 text-black mb-4">
            Shop By Categories
          </Text>
          <CategoryPills />
        </View>

        {/* --- Recommended Products Section (Now uses live data with the new card) --- */}
        <View className="mt-7">
          <View className="flex-row justify-between items-center px-4 mb-3">
            <Text className="text-lg font-semibold text-black">
              Recommended For You
            </Text>
            <Text className="text-[#64C27B] font-medium">View all</Text>
          </View>
          {renderRecommendedList()}
        </View>

        {/* --- Recently Listed Section (Still uses mock data but with the new card style) --- */}
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

        {/* --- Best Farmers Section (No change) --- */}
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
