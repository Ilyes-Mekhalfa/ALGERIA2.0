import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import productService from "../../services/productServices"; // Adjust this path
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/providers/AuthProvider"; // Import your useAuth hook

const filterTabs = ["Active", "Completed"];

const Listings = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Active");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. GET THE USER OBJECT FROM THE AUTH CONTEXT ---
  const { user } = useAuth();
  // ---------------------------------------------------

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setProducts([]);
      return;
    }

    const fetchMyProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("FRONTEND: Requesting products for user ID:", user.id);

        // --- THIS IS THE FIX ---
        // Pass the user.id directly as an argument to the service function.
        const response = await productService.getMyProducts(user.id);
        // -----------------------

        setProducts(response || []);
      } catch (err) {
        console.error("Failed to fetch 'My Listings':", err);
        setError("Could not load your products.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, [user]);
  const renderContent = () => {
    if (loading) {
        

      return (
        <ActivityIndicator size="large" color="#50C878" className="mt-16" />
      );
    }
    if (error) {
      return <Text className="text-center text-red-500 mt-16">{error}</Text>;
    }
    // Add a specific message if the user is not logged in
    if (!user) {
      return (
        <Text className="text-center text-gray-500 mt-16">
          Please log in to see your products.
        </Text>
      );
    }
    return (
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className="flex-1 mb-4">
            <ProductCard item={item} />
          </View>
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        columnWrapperStyle={{ gap: 16 }}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-16">
            You haven&apos;t listed any products yet.
          </Text>
        }
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F4FDF6]">
      <StatusBar barStyle="dark-content" />

      <Header />
      <View className="flex-row justify-between items-center mt-6 mb-8 px-5">
        <Text className="text-3xl font-extrabold">My Listings</Text>
        <TouchableOpacity
          className="flex-row items-center bg-[#50C878] px-5 py-3 rounded-full shadow-md"
          onPress={() => router.push("/new")}
        >
          <Ionicons name="add" size={22} color="#fff" />
          <Text className="text-white font-semibold ml-1 text-lg">
            Add Product
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-evenly items-center px-5 mb-4">
        {filterTabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full ${isActive ? "bg-[#FCD27B]" : " bg-[#D8D8D8]"}`}
            >
              <Text
                className={`font-bold ${isActive ? "text-white" : "text-[#808080]"}`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {renderContent()}
    </SafeAreaView>
  );
};

export default Listings;
