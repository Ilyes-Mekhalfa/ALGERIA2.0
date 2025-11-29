// In app/(farmer)/products/[id].js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Feather,
  Package,
} from "lucide-react-native";

import productService from "../../services/productServices"; // Adjust this path

const FALLBACK_IMAGE_URL =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500";

// A small reusable component for the detail rows
const DetailRow = ({ icon: Icon, label, value }) => (
  <View className="flex-row items-center">
    <Icon size={20} color="#4b5563" />
    <Text className="text-base text-gray-600 ml-3">{label}: </Text>
    <Text className="text-base font-bold text-gray-800">{value}</Text>
  </View>
);

const ProductDetailsScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      Alert.alert("Error", "Product ID is missing.");
      return;
    }
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Your service might return the product directly or inside a `data` object.
        // Adjust as needed. Let's assume it returns the product directly for now.
        const response = await productService.getProductById(id);
        console.log("Product details:", response);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        Alert.alert("Error", "Could not load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center">
        <ActivityIndicator size="large" color="#166534" />
      </SafeAreaView>
    );
  }
  if (!product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-lg text-red-500">Product not found.</Text>
      </SafeAreaView>
    );
  }

  const imageUrl = FALLBACK_IMAGE_URL;

  return (
    <SafeAreaView className="flex-1 pb-4 bg-white" edges={["top"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* --- Image and Header Buttons --- */}
        <View>
          <Image source={{ uri: imageUrl }} className="w-full h-80" />
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-14 left-5 bg-white/80 p-2 rounded-full shadow-lg shadow-black/20"
          >
            <ArrowLeft size={24} color="#1f2937" />
          </TouchableOpacity>
          {/* Placeholder for a 'like' button */}
          <TouchableOpacity className="absolute top-14 right-5 bg-white/80 p-2 rounded-full shadow-lg shadow-black/20">
            <Star size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        {/* --- Overlapping Content Area --- */}
        <View className="bg-white rounded-t-3xl mt-[-40] pt-8 px-6">
          {/* Farmer Info Card */}
          <TouchableOpacity className="flex-row items-center bg-gray-50 p-3 rounded-2xl border border-gray-200 mb-6">
            <Image
              source={{
                uri: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
              }}
              className="w-12 h-12 rounded-full"
            />
            <View className="ml-4">
              <Text className="text-sm text-gray-500">Producer</Text>
              <Text className="text-lg font-bold text-gray-900">
                {product.userId.username || "Anonymous Farmer"}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Product Name */}
          <Text className="text-4xl font-extrabold text-gray-900">
            {product.name}
          </Text>

          {/* Details Section */}
          <View className="mt-6 space-y-3">
            <DetailRow
              icon={Feather}
              label="Quality"
              value={product.quality || "Standard"}
            />
            <DetailRow
              icon={Package}
              label="Stock"
              value={`${product.stock ?? 0} ${product.unit || ""}`}
            />
          </View>

          {/* Description Section */}
          <View className="mt-6 pt-6 border-t border-gray-200">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              About this Product
            </Text>
            <Text className="text-base text-gray-700 leading-relaxed">
              {product.description || "No details available."}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* --- Sticky Footer Action Bar --- */}
      <View className="absolute bottom-0 w-full bg-white p-4 border-t border-gray-200 flex-row items-center justify-between">
        <View>
          <Text className="text-sm text-gray-500">Price</Text>
          <Text className="text-3xl font-bold text-green-700">
            {product.price} DZD
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.replace(`/buy/${product._id}`)} className="bg-green-700 h-14 rounded-2xl flex-1 ml-4 flex-row items-center justify-center">
          <ShoppingCart size={24} color="white" />
          <Text className="text-white font-bold text-lg ml-2">Buy</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
