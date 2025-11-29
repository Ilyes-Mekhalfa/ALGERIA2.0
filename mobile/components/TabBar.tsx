import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
// 1. Import the specific icons for a Seller Dashboard
import {
  Home,
  Leaf, // For "Products"
  Package, // For "Orders"
  Wallet, // For "Payments"
} from "lucide-react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

// 2. Update the Map to match your new Route Names
const iconMap: Record<string, React.ElementType> = {
  index: Home, // Matches 'app/(tabs)/index.t
  listings: Leaf, // Matches 'app/(tabs)/products.tsx'
  Orders: Package, // Matches 'app/(tabs)/orders.tsx'
  Payments: Wallet, // Matches 'app/(tabs)/payments.tsx'
};

interface TabItemProps {
  route: any;
  index: number;
  state: any;
  descriptors: any;
  navigation: any;
}

const TabItem = ({
  route,
  index,
  state,
  descriptors,
  navigation,
}: TabItemProps) => {
  const isFocused = state.index === index;
  const { options } = descriptors[route.key];

  // Get the icon, default to Home if not found
  const IconComponent = iconMap[route.name] || Home;

  const scale = useSharedValue(1);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }

    scale.value = withTiming(0.9, { duration: 50 }, () => {
      scale.value = withSpring(1, { damping: 12, stiffness: 350 });
    });
  };

  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      layout={LinearTransition.springify().damping(20).mass(0.3).stiffness(250)}
      className={`flex-row items-center justify-center py-3 rounded-full overflow-hidden my-1 ${
        isFocused ? "bg-[#50C878] flex-1 px-4 mx-2" : "bg-transparent px-3"
      }`}
    >
      <Animated.View style={animatedIconStyle}>
        <IconComponent
          size={22}
          color={isFocused ? "#fff" : "#3D8D60"} // White when active, Dark Green when inactive
        />
      </Animated.View>

      {isFocused && (
        <Animated.View
          entering={FadeIn.duration(100).delay(50)}
          exiting={FadeOut.duration(50)}
          className="ml-2"
        >
          <Text
            className="text-white font-semibold text-base capitalize"
            numberOfLines={1}
          >
            {/* If the route is 'index', show 'Home', otherwise show route name */}
            {options.title || (route.name === "index" ? "Home" : route.name)}
          </Text>
        </Animated.View>
      )}
    </AnimatedTouchableOpacity>
  );
};

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View
      className="absolute bottom-0 w-full items-center"
      pointerEvents="box-none"
    >
      <SafeAreaView edges={["bottom"]} className="w-full px-4 pb-4">
        {/* Container Background Color Matches your Screenshot (#D1F7E2 is a light mint) */}
        <View className="flex-row bg-[#D1F7E2] rounded-full p-1.5 shadow-sm shadow-green-100 items-center justify-between">
          {state.routes.map((route, index) => (
            <TabItem
              key={route.key}
              route={route}
              index={index}
              state={state}
              descriptors={descriptors}
              navigation={navigation}
            />
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CustomTabBar;
