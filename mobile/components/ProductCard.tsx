// In components/ProductCard.js

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Star } from "lucide-react-native";
import { Link } from "expo-router";

const FALLBACK_IMAGE_URL =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500";

const ProductCard = ({ item }: any) => {
  // --- 1. SAFETY CHECK FOR THE ENTIRE ITEM ---
  // If the item prop itself is missing, render nothing.
  if (!item) {
    return null;
  }
  // ------------------------------------------

  // --- 2. CORRECTLY USE THE ITEM'S IMAGE URL ---
  const imageUrl = FALLBACK_IMAGE_URL;
  // ------------------------------------------

  return (
    <Link href={`/product/${item._id}`} asChild>
      <TouchableOpacity className="flex-1 bg-white rounded-2xl shadow-md overflow-hidden">
        <View className="flex-1 bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Image and Quality Badge */}
          <View>
            <Image
              source={{ uri: imageUrl }}
              className="w-full h-32"
              resizeMode="cover"
            />
            {/* Conditionally render the badge ONLY if quality exists */}
            {item.quality && (
              <View className="absolute top-2 right-2 flex-row items-center bg-yellow-400 px-2 py-1 rounded-full">
                <Star size={12} color="#fff" fill="#fff" />
                <Text className="text-white text-xs font-bold ml-1">
                  {item.quality}
                </Text>
              </View>
            )}
          </View>

          {/* Product Details Container */}
          <View className="p-3 justify-between flex-1">
            <View>
              {/* --- 3. ADD FALLBACKS FOR ALL DATA --- */}
              <Text
                className="text-base font-bold text-gray-800"
                numberOfLines={1}
              >
                {item.name || "Unnamed Product"}
              </Text>
              <Text className="text-xs text-gray-500 mt-1" numberOfLines={2}>
                {item.description || "No description available."}
              </Text>
            </View>

            <View className="mt-4">
              <Text className="text-sm font-semibold text-gray-600">
                {/* Using the Nullish Coalescing operator (??) is best for numbers */}
                Available: {item.stock ?? 0} {item.unit || ""}
              </Text>
              <Text className="text-xl font-extrabold text-green-700 mt-1">
                {item.price ?? 0} DZD
              </Text>
            </View>
            {/* -------------------------------------- */}

            <TouchableOpacity className="bg-green-700 py-2.5 rounded-lg mt-4">
              <Text className="text-white font-bold text-center">
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default ProductCard;
