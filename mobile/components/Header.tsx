import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { MapPin } from "lucide-react-native";
import { useAuth } from "@/providers/AuthProvider"; // <-- 1. IMPORT useAuth

type HeaderProps = {
  count?: number;
  onBellPress?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  count = 5,
  onBellPress,
}) => {
  const router = useRouter();
  // --- 2. GET THE USER OBJECT FROM THE AUTH CONTEXT ---
  const { user } = useAuth();
  // ---------------------------------------------------

  // Use the user's image if it exists, otherwise use the default icon.
  const avatarSource = user?.imageUrl
    ? { uri: user.imageUrl }
    : require("@/assets/images/icon.png");

  return (
    <View className="flex-row items-center justify-between px-4 pt-2 pb-4">
      {/* LEFT SIDE — Avatar + Greeting */}
      <TouchableOpacity
        onPress={() => router.push("/profile/profile")} // Use your actual profile route
        className="flex-row items-center"
      >
        <Image
          source={avatarSource}
          className="w-11 h-11 rounded-full bg-gray-200" // Added a background color for the fallback
        />
        <View className="ml-3">
          {/* --- 3. DISPLAY DYNAMIC USER DATA --- */}
          <Text className="text-base font-semibold text-gray-900">
            {/* Show a generic greeting if user is not loaded yet */}
            Hi {user?.username || "Guest"} 👋
          </Text>
          <View className="flex-row items-center">
            <MapPin size={16} color="#374151" />
            <Text className="ml-1 text-gray-600 font-medium text-sm">
              {user?.location || "Unknown Location"}
            </Text>
          </View>
          {/* ----------------------------------- */}
        </View>
      </TouchableOpacity>

      {/* RIGHT SIDE — Chat + Bell (No changes needed) */}
      <View className="flex-row items-center">
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
        {/* CHAT ICON */}
        <TouchableOpacity
          onPress={() => router.push("/shared/ChatListScreen")} // Adjust this route if needed
          className="relative p-2 ml-2"
        >
          <Ionicons name="chatbubbles-outline" size={26} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
