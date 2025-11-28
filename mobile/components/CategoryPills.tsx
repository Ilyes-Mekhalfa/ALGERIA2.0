import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const categories = [
  { id: 1, label: "Veggies" },
  { id: 2, label: "Fruits" },
  { id: 3, label: "Dairy" },
  { id: 4, label: "Meat" },
];

export default function CategoryPills() {
  const [active, setActive] = useState(1);

  return (
    <View className="flex-row items-center gap-3 mt-5 px-4">
      {categories.map((c) => {
        const isActive = active === c.id;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const animatedStyle = useAnimatedStyle(() => ({
          backgroundColor: withTiming(isActive ? "#64C27B" : "#FFFFFF"),
        }));

        return (
          <Animated.View
            key={c.id}
            style={[
              animatedStyle,
              {
                paddingHorizontal: 18,
                paddingVertical: 10,
                borderRadius: 25,
                shadowColor: "#000",
                shadowOpacity: 0.07,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
                elevation: 3,
                marginRight: 12,
              },
            ]}
          >
            <TouchableOpacity onPress={() => setActive(c.id)}>
              <Text className={isActive ? "text-white" : "text-gray-600"}>
                {c.label}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
}
