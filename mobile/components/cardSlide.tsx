import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, Text } from "react-native";
import Animated, {
  FadeIn,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function CardSlide({ title, image, weight, pricePer }: any) {
  const scale = useSharedValue(0.94);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(scale.value, {
            damping: 14,
            stiffness: 120,
          }),
        },
      ],
    };
  });

  return (
    // Outer wrapper → entering animation ONLY
    <Animated.View entering={FadeInUp.duration(350)}>
      {/* Inner wrapper → transform animation ONLY */}
      <Animated.View
        style={[
          animatedStyle,
          {
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 6,
          },
        ]}
        className="rounded-2xl overflow-hidden w-full h-full"
      >
        <ImageBackground
          source={{ uri: image }}
          className="w-full h-full"
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.85)", "rgba(0,0,0,0.40)", "rgba(0,0,0,0.0)"]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            className="absolute bottom-0 left-0 right-0 h-28 justify-end p-4"
          >
            {/* TITLE */}
            <Animated.Text
              entering={FadeIn.duration(500)}
              className="text-white font-semibold text-lg leading-tight"
            >
              {title}
            </Animated.Text>

            {/* DETAILS */}
            <Text className="text-white/75 text-xs mt-1">
              {weight} • {pricePer}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    </Animated.View>
  );
}
