import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import React from "react";

export default function ProductCard({ item }: any) {
  const scale = useSharedValue(1);

  const animatedCard = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableWithoutFeedback
      onPressIn={() => (scale.value = withSpring(0.96))}
      onPressOut={() => (scale.value = withSpring(1))}
    >
      <Animated.View
        style={animatedCard}
        className="bg-white rounded-2xl p-3 w-[170px] mr-4"
      >
        <Image
          source={{ uri: item.image }}
          className="w-full h-28 rounded-lg"
          resizeMode="cover"
        />

        <Text className="font-semibold text-[15px] leading-tight mt-2 text-black dark:text-white">
          {item.title}
        </Text>

        <Text className="text-gray-500 dark:text-gray-300 text-xs mt-1">
          ${item.price} / {item.weight}
        </Text>

        <View className="bg-[#64C27B] w-8 h-8 rounded-full items-center justify-center self-end mt-2">
          <Text className="text-white text-lg">+</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
