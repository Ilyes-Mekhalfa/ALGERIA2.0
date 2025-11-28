import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

type HeaderProps = {
  count?: number;
  onAvatarPress?: () => void;
  onBellPress?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  count = 5,
  onAvatarPress,
  onBellPress,
}) => {
  const router = useRouter();

  const onChatPress = () => {
    router.push("/shared/chat");
  };

  return (
    <View className="flex-row items-center justify-between px-4 pt-2 pb-4">
      {/* LEFT SIDE — Avatar + Greeting */}
      <TouchableOpacity
        onPress={onAvatarPress}
        className="flex-row items-center"
      >
        <Image
          source={require("@/assets/images/icon.png")}
          className="w-11 h-11 rounded-full"
        />

        <View className="ml-3">
          <Text className="text-base font-semibold text-gray-900">
            Hi Mohamed 👋
          </Text>
          <Text className="text-sm text-gray-500">
            Ready to check contracts?
          </Text>
        </View>
      </TouchableOpacity>

      {/* RIGHT SIDE — Chat + Bell */}
      <View className="flex-row items-center">
        {/* CHAT ICON */}
        <TouchableOpacity onPress={onChatPress} className="relative p-2 mr-2">
          <Ionicons name="chatbubbles-outline" size={26} color="#333" />
        </TouchableOpacity>

        {/* BELL ICON */}
        <TouchableOpacity onPress={onBellPress} className="relative">
          <Ionicons name="notifications-outline" size={26} color="#333" />

          {count > 0 && (
            <View
              className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 
                           rounded-full items-center justify-center"
            >
              <Text className="text-[10px] text-white font-bold">{count}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
