import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function ProductCard({ item }: any) {
  return (
    <View className="bg-white rounded-2xl p-3 w-[170px] mr-4">
      <Image
        source={{ uri: item.image }}
        className="w-full h-28 rounded-lg"
        resizeMode="cover"
      />

      <Text className="font-semibold text-[15px] leading-tight mt-2">
        {item.title}
      </Text>

      <Text className="text-gray-500 text-xs mt-1">
        ${item.price} / {item.weight}
      </Text>

      <TouchableOpacity className="bg-[#64C27B] w-8 h-8 rounded-full items-center justify-center self-end mt-2">
        <Text className="text-white text-lg">+</Text>
      </TouchableOpacity>
    </View>
  );
}
