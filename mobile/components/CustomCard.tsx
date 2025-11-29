// In components/Ricently.js (your ProductCard file)

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';

const FALLBACK_IMAGE_URL = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500';

const CustomCard = ({ item }) => {
  // Safety check to prevent crashes if item is invalid
  if (!item) {
    return null;
  }

  // Use the live imageUrl if it exists, otherwise use the mock 'image' property, or a final fallback
  const imageUrl = item.imageUrl || item.image || FALLBACK_IMAGE_URL;

  return (
    
    <View  className="flex-1 mx-2 bg-white rounded-2xl shadow-lg shadow-black/10 overflow-hidden w-44">
      
      {/* Image and Quality Badge */}
      <View>
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-32"
          resizeMode="cover"
        />
        {/* Quality Badge: Only shows if item.quality exists */}
        {item.quality && (
          <View className="absolute top-2 right-2 flex-row items-center bg-amber-400 px-2 py-1 rounded-full">
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
          <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
            {item.name || "Unnamed Product"}
          </Text>
          <Text className="text-xs text-gray-500 mt-1" numberOfLines={2}>
            {item.description || "No description available."}
          </Text>
        </View>

        <View className="mt-4">
          <Text className="text-sm font-semibold text-gray-600">
            {/* Display stock and unit if they exist */}
            {item.stock ? `Stock: ${item.stock} ${item.unit || ''}` : ''}
          </Text>
          <Text className="text-lg font-extrabold text-green-700 mt-1">
            {/* Handle both number price (live) and string price (mock) */}
            {typeof item.price === 'number' ? `${item.price} DZD` : item.price}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomCard;
