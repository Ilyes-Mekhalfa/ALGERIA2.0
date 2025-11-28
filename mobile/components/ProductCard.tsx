// components/ProductCard.js
import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const ProductCard = ({ item }: any) => {
  return (
    <View className="mt-3 flex-1 bg-white rounded-2xl p-4 shadow-md shadow-green-400 mx-1">
      {/* Product Image */}
      <Image
        source={item.image} // Assuming local image require path
        className="w-full h-32"
        resizeMode="contain"
      />

      {/* Title and Status Badge */}
      <View className="flex-row justify-between items-start mt-2">
        <Text className="text-lg font-bold w-[60%]">{item.name}</Text>
        <View
          className={`px-3 py-1 rounded-full ${
            item.status === "Active" ? "bg-[#D1F7E2]" : "bg-gray-100"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              item.status === "Active" ? "text-[#34C759]" : "text-gray-500"
            }`}
          >
            {item.status}
          </Text>
        </View>
      </View>

      {/* Quantity */}
      <Text className="text-gray-500 mt-2">{item.quantity}</Text>

      {/* Footer: Date and Actions */}
      <View className="flex-row justify-between items-center mt-4">
        <Text className="text-gray-400 text-xs w-[50%]">{item.date}</Text>

        <View className="flex-row gap-2">
          {/* Delete Button */}
          <TouchableOpacity className="w-9 h-9 border border-red-100 rounded-full justify-center items-center">
            <Feather name="trash-2" size={18} color="#FF3B30" />
          </TouchableOpacity>
          {/* Edit Button */}
          <TouchableOpacity>
            <Feather name="edit" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
