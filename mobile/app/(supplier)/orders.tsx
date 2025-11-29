import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/providers/AuthProvider";
import orderService from "../../services/orderServices"; // Adjust this path if needed

const FALLBACK_IMAGE_URL =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500";

// --- Reusable Order Card Component ---
const OrderCard = ({ item }) => {
  if (!item) return null; // Safety check for bad data

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "cancelled":
        return "bg-red-100 text-red-600";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      default: // 'pending'
        return "bg-yellow-100 text-yellow-700";
    }
  };
  const statusStyle = getStatusColor(item.status);

  // Safely access the first product for display purposes
  const firstProduct = item.products?.[0] || {};
  const imageUrl = firstProduct.imageUrl || FALLBACK_IMAGE_URL;

  // Calculate the total value of the order
  const totalValue =
    item.products?.reduce((sum, p) => sum + p.price * p.quantity, 0) || 0;

  return (
    <View className="bg-white rounded-2xl p-3 mb-4 shadow-sm mx-4">
      <View className="flex-row mb-3">
        <Image
          source={{ uri: imageUrl }}
          className="w-24 h-24 rounded-xl bg-gray-100"
          resizeMode="cover"
        />
        <View className="flex-1 ml-3 justify-between">
          <View>
            <Text className="text-gray-500 font-bold text-xs mb-1">
              {totalValue.toLocaleString("en-US")} DZD
            </Text>
            <Text
              className="text-black font-bold text-base leading-5 mb-1"
              numberOfLines={2}
            >
              {firstProduct.name || `Order #${item._id.slice(-6)}`}
            </Text>
            <Text className="text-gray-400 text-xs">
              {/* This assumes your .populate() adds the username */}
              Seller: {item.seller?.username || "N/A"}
            </Text>
          </View>
          <Text className="text-gray-400 text-xs text-right self-end">
            {item.products?.length || 0}{" "}
            {item.products?.length === 1 ? "item" : "items"}
          </Text>
        </View>
      </View>
      <View className="h-[1px] bg-gray-100 w-full mb-3" />
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-400 text-xs font-medium">
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        <View className={`px-3 py-1 rounded-full ${statusStyle.split(" ")[0]}`}>
          <Text
            className={`text-xs font-bold capitalize ${statusStyle.split(" ")[1]}`}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );
};

// --- Main Orders Screen Component ---
const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState("New");
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't fetch if there's no user
    if (!user) {
      setLoading(false);
      setOrders([]);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        // Define params based on the active tab
        const params = {
          status:
            activeTab === "New" ? "pending,shipped" : "delivered,cancelled",
        };

        // Correctly call the service with userId and params
        const response = await orderService.getMyOrders(user.id);

        setOrders(response.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Could not load your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, activeTab]); // Re-run when user or tab changes

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator size="large" color="#22c55e" className="mt-10" />
      );
    }
    if (error) {
      return <Text className="text-center text-red-500 mt-10">{error}</Text>;
    }
    if (!user) {
      return (
        <Text className="text-center text-gray-500 mt-10">
          Please log in to view your orders.
        </Text>
      );
    }
    return (
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <OrderCard item={item} />}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">
            You have no {activeTab.toLowerCase()} orders.
          </Text>
        }
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F6F8FA]">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground
        source={require("@/assets/images/Frame3384411.png")} // Make sure this path is correct
        className="w-full pt-16 pb-4"
        resizeMode="cover"
      >
        <View className="px-5">
          <Text className="text-3xl font-bold text-black mb-6">My orders</Text>
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

      {renderContent()}
    </SafeAreaView>
  );
};

export default OrdersScreen;
