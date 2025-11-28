import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator, // Import for loading spinner
} from "react-native";
import React, { useState, useEffect } from "react"; // Import useEffect
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router"; // Import for navigation

// --- 1. IMPORT YOUR SERVICE, NOT STATIC DATA ---
import productService from "../../services/productServices"; // Adjust this path
// import productData from "@/lib/products"; // Remove this
// ---------------------------------------------

import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

const filterTabs = ["Active", "Draft", "Completed"];

const Listings = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Active");

  // --- 2. ADD STATE FOR PRODUCTS, LOADING, AND ERRORS ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // ----------------------------------------------------

  // --- 3. FETCH DATA FROM THE API ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the service to get all products
        const response = await productService.getAllProducts();
        
        // --- THIS IS THE FIX ---
        // The response IS the array of products. Set it directly.
        setProducts(response || []); 
        // -----------------------

      } catch (err) {
        console.error("Failed to fetch listings:", err);
        setError("Could not load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- 4. RENDER LOADING OR ERROR STATES ---
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#50C878" className="mt-16" />;
    }

    if (error) {
      return <Text className="text-center text-red-500 mt-16">{error}</Text>;
    }

    return (
      <FlatList
        data={products} // Use state variable here
        keyExtractor={(item) => item._id} // Use MongoDB's _id
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
            <Text className="text-center text-gray-500 mt-16">No products found.</Text>
        }
      />
    );
  };
  // ---------------------------------------

  return (
    <SafeAreaView className="flex-1 bg-[#F4FDF6]">
      <StatusBar barStyle="dark-content" />
      
      {/* --- RENDER HEADER AND TABS STATICALLY --- */}
      <Header />
      <View className="flex-row justify-evenly items-center mt-6 mb-8 px-5">
        <Text className="text-3xl font-extrabold">Products</Text>
        <TouchableOpacity 
            className="flex-row items-center bg-[#50C878] px-5 py-3 rounded-full shadow-md"
            onPress={() => router.push('/new')} // <-- 5. Link to Add Product page
        >
          <Ionicons name="add" size={22} color="#fff" />
          <Text className="text-white font-semibold ml-1 text-lg">
            Add Product
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between px-5 mb-4">
        {filterTabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full ${
                isActive
                  ? "bg-[#FCD27B]"
                  : "border-2 border-[#FCD27B] bg-[#FFFDF5]"
              }`}
            >
              <Text className={`font-bold ${isActive ? "text-white" : "text-[#FCD27B]"}`}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      {/* --- RENDER THE DYNAMIC CONTENT --- */}
      {renderContent()}

    </SafeAreaView>
  );
};

export default Listings;
