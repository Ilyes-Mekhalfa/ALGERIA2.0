import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import {
  ChevronLeft,
  TrendingUp,
  Clock,
  BarChart3,
  Bell,
  CheckCheck,
} from "lucide-react-native";
import { useRouter } from "expo-router";

// --- TYPES (Based on your Mongoose Model) ---
type NotificationTitle =
  | "Most Bought Products"
  | "Best Time To Buy"
  | "Expectations ";

interface Notification {
  _id: string;
  title: NotificationTitle;
  message: string;
  createdAt: string; // serialized date
  read?: boolean; // Optional UI state
}

// --- MOCK DATA ---
const NOTIFICATIONS: Notification[] = [
  {
    _id: "1",
    title: "Most Bought Products",
    message: "Strawbery bought 100 times",
    createdAt: "2023-11-25T16:45:00",
    read: false,
  },

  {
    _id: "2",
    title: "Best Time To Buy",
    message:
      "Based on market analysis, potato prices are expected to drop tomorrow morning.",
    createdAt: "2023-11-27T14:15:00",
    read: true,
  },
  {
    _id: "3",
    title: "Expectations ",
    message:
      "Projected market stability for the upcoming week. Great time to stock up on dry goods.",
    createdAt: "2023-11-26T10:00:00",
    read: true,
  },
  {
    _id: "4",
    title: "Most Bought Products",
    message: "Oranges are selling out fast. 500q sold in the last hour.",
    createdAt: "2023-11-25T16:45:00",
    read: true,
  },

  {
    _id: "5",
    title: "Most Bought Products",
    message:
      "Tomatoes are currently trending! Demand has increased by 20% in Algiers region.",
    createdAt: "2023-11-28T09:30:00",
    read: true,
  },
];

// --- HELPER: Get Icon based on Title ---
const getNotificationIcon = (title: NotificationTitle) => {
  switch (title) {
    case "Most Bought Products":
      return { icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-100" };
    case "Best Time To Buy":
      return { icon: Clock, color: "text-green-600", bg: "bg-green-100" };
    case "Expectations ":
      return { icon: BarChart3, color: "text-orange-600", bg: "bg-orange-100" };
    default:
      return { icon: Bell, color: "text-gray-600", bg: "bg-gray-100" };
  }
};

// --- HELPER: Format Date ---
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;

  if (diffInHours < 24) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

// --- COMPONENT: NOTIFICATION CARD ---
const NotificationCard = ({ item }: { item: Notification }) => {
  const { icon: Icon, color, bg } = getNotificationIcon(item.title);

  return (
    <View
      className={`bg-white p-4 rounded-2xl mb-3 flex-row items-start ${!item.read ? "border-l-4 border-green-500" : ""}`}
    >
      {/* Icon Box */}
      <View
        className={`w-12 h-12 ${bg} rounded-full items-center justify-center mr-4`}
      >
        {/* Note: Tailwind text colors don't apply to Lucide props directly usually, 
            so we map the color string to a hex code or use style/className if supported */}
        <Icon
          size={24}
          color={
            item.title === "Most Bought Products"
              ? "#2563EB"
              : item.title === "Best Time To Buy"
                ? "#16A34A"
                : item.title === "Expectations "
                  ? "#EA580C"
                  : "#4B5563"
          }
        />
      </View>

      {/* Content */}
      <View className="flex-1">
        <View className="flex-row justify-between items-start mb-1">
          <Text className="text-black font-bold text-base flex-1 mr-2 leading-tight">
            {item.title}
          </Text>
          <Text className="text-gray-400 text-xs font-medium">
            {formatTime(item.createdAt)}
          </Text>
        </View>

        <Text className="text-gray-500 text-sm leading-5 mb-2">
          {item.message}
        </Text>
      </View>
    </View>
  );
};

// --- MAIN SCREEN ---
const NotificationScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F6F8FA]">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* --- HEADER --- */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop",
        }}
        className="w-full pt-14 pb-6 bg-white shadow-sm rounded-b-[30px] z-10"
        imageStyle={{ opacity: 0.05 }}
      >
        <View className="flex-row items-center justify-between px-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-gray-50 active:bg-gray-200"
          >
            <ChevronLeft size={28} color="black" />
          </TouchableOpacity>

          <Text className="text-xl font-bold text-black">Notifications</Text>

          <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full active:bg-gray-100">
            <CheckCheck size={24} color="#22C55E" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* --- LIST --- */}
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <NotificationCard item={item} />}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center mt-20">
            <Bell size={48} color="#D1D5DB" />
            <Text className="text-gray-400 mt-4 text-base">
              No notifications yet
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default NotificationScreen;
