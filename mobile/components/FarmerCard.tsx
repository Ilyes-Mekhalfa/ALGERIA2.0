import { View, Text, Image } from "react-native";
import React from "react";

export default function FarmerCard({ item }: any) {
  return (
    <View className="items-center mr-5">
      <Image source={{ uri: item.avatar }} className="w-14 h-14 rounded-full" />
      <Text className="text-xs font-semibold mt-1 text-black">{item.name}</Text>
      <Text className="text-[10px] text-yellow-500">★ {item.rating}</Text>
    </View>
  );
}
