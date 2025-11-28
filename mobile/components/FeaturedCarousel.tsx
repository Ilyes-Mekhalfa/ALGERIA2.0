import React from "react";
import { Dimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import CardSlide from "./cardSlide";
import productData from "@/lib/fProducts";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Realistic width for modern cards
const ITEM_WIDTH = SCREEN_WIDTH * 0.88;
const ITEM_HEIGHT = 180;

export default function HomeCarousel() {
  const progress = useSharedValue(0);

  return (
    <View className="w-full items-center mt-6">
      {/* CAROUSEL */}
      <Carousel
        width={ITEM_WIDTH}
        height={ITEM_HEIGHT}
        data={productData}
        loop
        autoPlay
        autoPlayInterval={3500}
        scrollAnimationDuration={650}
        onProgressChange={progress}
        pagingEnabled
        mode="parallax"
        modeConfig={{
          parallaxScrollingOffset: 60,
          parallaxScrollingScale: 0.85,
        }}
        style={{
          width: ITEM_WIDTH,
        }}
        renderItem={({ item }: any) => <CardSlide {...item} />}
      />

      {/* PAGINATION DOTS */}
      <Pagination.Basic
        progress={progress}
        data={productData}
        dotStyle={{ backgroundColor: "#C5C5C5", borderRadius: 50 }}
        activeDotStyle={{
          backgroundColor: "#64C27B",
          overflow: "hidden",
          borderRadius: 50,
        }}
        containerStyle={{ gap: 5, marginTop: 10 }}
      />
    </View>
  );
}
