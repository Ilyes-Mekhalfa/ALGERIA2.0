import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- MOCK DATA ---
const ORDERS = [
  {
    id: "1",
    title: "libero ullamco tempor",
    price: "50000 DA",
    farmer: "Farmer Name",
    quantity: "5q",
    date: "27/11, 10:20AM",
    status: "Canceled",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "2",
    title: "cOngue pretium libero",
    price: "50000 DA",
    farmer: "Farmer Name",
    quantity: "5q",
    date: "27/11, 10:20AM",
    status: "Canceled",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "3",
    title: "Labore blandit labore",
    price: "50000 DA",
    farmer: "Farmer Name",
    quantity: "5q",
    date: "27/11, 10:20AM",
    status: "Canceled",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80",
  },
];

// --- COMPONENT: ORDER CARD ---
const OrderCard = ({ item }: { item: (typeof ORDERS)[0] }) => {
  // Helper to determine status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "canceled":
        return "bg-red-100 text-red-500";
      case "delivered":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const statusStyle = getStatusColor(item.status);

  return (
    <View className="bg-white rounded-2xl p-3 mb-4 shadow-sm mx-4">
      {/* Top Section: Image + Info */}
      <View className="flex-row mb-3">
        {/* Product Image */}
        <Image
          source={{ uri: item.image }}
          className="w-24 h-24 rounded-xl bg-gray-100"
          resizeMode="cover"
        />

        {/* Details Column */}
        <View className="flex-1 ml-3 justify-between">
          <View>
            <Text className="text-gray-500 font-bold text-xs mb-1">
              {item.price}
            </Text>
            <Text className="text-black font-bold text-base leading-5 mb-1">
              {item.title}
            </Text>
            <Text className="text-gray-400 text-xs">{item.farmer}</Text>
          </View>

          {/* Quantity aligned to bottom right of info area */}
          <Text className="text-gray-400 text-xs text-right self-end">
            {item.quantity}
          </Text>
        </View>
      </View>

      {/* Divider Line */}
      <View className="h-[1px] bg-gray-100 w-full mb-3" />

      {/* Bottom Section: Date + Status */}
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-400 text-xs font-medium">{item.date}</Text>

        <View className={`px-3 py-1 rounded-full ${statusStyle.split(" ")[0]}`}>
          <Text className={`text-xs font-bold ${statusStyle.split(" ")[1]}`}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );
};

// --- MAIN SCREEN ---
const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState<"New" | "Past">("New");

  return (
    <SafeAreaView className="flex-1 bg-[#F6F8FA]">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* --- HEADER WITH BACKGROUND --- */}
      <ImageBackground
        // Use the same header background you used in Home
        source={require("@/assets/images/Frame3384411.png")} // Replace with your local require()
        className="w-full pt-16 pb-4"
        resizeMode="cover"
      >
        <View className="px-5">
          <Text className="text-3xl font-bold text-black mb-6">My orders</Text>

          {/* Custom Tab Switcher */}
          <View className="flex-row items-center gap-6">
            <TouchableOpacity
              onPress={() => setActiveTab("New")}
              className={`pb-2 ${activeTab === "New" ? "border-b-2 border-green-500" : "border-b-2 border-transparent"}`}
            >
              <Text
                className={`text-base font-bold ${activeTab === "New" ? "text-green-600" : "text-gray-400"}`}
              >
                New orders
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("Past")}
              className={`pb-2 ${activeTab === "Past" ? "border-b-2 border-green-500" : "border-b-2 border-transparent"}`}
            >
              <Text
                className={`text-base font-bold ${activeTab === "Past" ? "text-green-600" : "text-gray-400"}`}
              >
                Past Orders
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* --- LIST CONTENT --- */}
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard item={item} />}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;
