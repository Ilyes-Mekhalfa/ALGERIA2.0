import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, SquarePen, Search } from "lucide-react-native";
import { useRouter } from "expo-router";

// --- MOCK DATA ---
const MESSAGES = [
  {
    id: "1",
    name: "user user",
    message:
      "Aliqua porttitor esse do minim mi quidem dis sum sum qui e sum saepe tota",
    time: "2:30 PM",
    unread: true,
  },
  {
    id: "2",
    name: "user user",
    message:
      "Aliqua porttitor esse do minim mi quidem dis sum sum qui e sum saepe tota",
    time: "2:30 PM",
    unread: true,
  },
  {
    id: "3",
    name: "user user",
    message:
      "Aliqua porttitor esse do minim mi quidem dis sum sum qui e sum saepe tota",
    time: "2:30 PM",
    unread: true,
  },
  {
    id: "4",
    name: "user user",
    message:
      "Aliqua porttitor esse do minim mi quidem dis sum sum qui e sum saepe tota",
    time: "2:30 PM",
    unread: true,
  },
  {
    id: "5",
    name: "user user",
    message:
      "Aliqua porttitor esse do minim mi quidem dis sum sum qui e sum saepe tota",
    time: "2:30 PM",
    unread: true,
  },
];

const MessageCard = ({ item }: { item: (typeof MESSAGES)[0] }) => (
  <TouchableOpacity
    className="bg-white p-4 rounded-2xl mb-3 flex-row items-start"
    activeOpacity={0.7}
  >
    {/* Avatar (Gray Circle) */}
    <View className="w-12 h-12 bg-gray-300 rounded-full mr-3" />

    {/* Content Section */}
    <View className="flex-1">
      {/* Top Row: Name + Time + Dot */}
      <View className="flex-row justify-between items-center mb-1">
        <Text className="font-bold text-black text-base">{item.name}</Text>

        <View className="flex-row items-center gap-2">
          <Text className="text-green-600 text-xs font-medium">
            {item.time}
          </Text>
          {item.unread && (
            <View className="w-2.5 h-2.5 bg-green-600 rounded-full" />
          )}
        </View>
      </View>

      {/* Message Preview */}
      <Text className="text-gray-500 text-sm leading-5" numberOfLines={2}>
        {item.message}
      </Text>
    </View>
  </TouchableOpacity>
);

const MessagesScreen = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-[#F5FBF7]">
      {/* --- HEADER --- 
        Note: The screenshot has a faint vegetable pattern background.
        If you have that image, wrap this View in an <ImageBackground>.
      */}
      <View className="px-5 pt-2 pb-4 bg-white rounded-b-[30px] shadow-sm mb-4">
        {/* Top Navigation Row */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-white"
          >
            <ArrowLeft size={24} color="black" />
          </TouchableOpacity>

          <Text className="text-xl font-bold text-black">Messages</Text>

          <TouchableOpacity className="w-10 h-10 items-center justify-center">
            <SquarePen size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white border border-green-600/30 h-12 rounded-2xl px-4">
          <Search size={20} color="gray" />
          <TextInput
            className="flex-1 ml-3 text-base text-black"
            placeholder=""
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* --- MESSAGES LIST --- */}
      <FlatList
        data={MESSAGES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageCard item={item} />}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;
