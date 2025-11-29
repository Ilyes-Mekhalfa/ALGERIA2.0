import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeft,
  Star,
  Minus,
  Plus,
  Bookmark,
  Trash2,
  MapPin,
  ChevronRight,
} from "lucide-react-native";
import { useRouter } from "expo-router";

// --- MOCK DATA ---
const CART_ITEMS = [
  {
    id: "1",
    name: "Tomato",
    seller: "Fatima Produce, Oran",
    rating: 4.2,
    price: 10000,
    unit: "DA/q",
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "2",
    name: "Fresh Bell Peppers",
    seller: "Fatima Produce, Oran",
    rating: 4.2,
    price: 2300,
    unit: "DA/Box",
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdf5dbc240?auto=format&fit=crop&w=200&q=80",
  },
];

// --- COMPONENT: CART ITEM ---
const CartItem = ({ item }: { item: (typeof CART_ITEMS)[0] }) => (
  <View className="bg-white rounded-2xl p-3 mb-4 shadow-sm mx-5">
    <View className="flex-row">
      {/* Product Image */}
      <Image
        source={{ uri: item.image }}
        className="w-24 h-24 rounded-xl bg-gray-100"
        resizeMode="cover"
      />

      {/* Details */}
      <View className="flex-1 ml-3">
        <View className="flex-row justify-between items-start">
          <View>
            <Text className="text-black font-bold text-lg">{item.name}</Text>
            <Text className="text-gray-400 text-xs mb-1">{item.seller}</Text>

            {/* Rating */}
            <View className="flex-row items-center mb-1">
              <Star size={12} color="#FBBF24" fill="#FBBF24" />
              <Text className="text-xs text-black font-bold ml-1">
                {item.rating}
              </Text>
            </View>
          </View>
        </View>

        {/* Price */}
        <Text className="text-green-600 font-bold text-base mt-1">
          {item.price.toLocaleString()}{" "}
          <Text className="text-gray-400 text-xs font-normal">{item.unit}</Text>
        </Text>
      </View>
    </View>

    {/* Bottom Row: Quantity & Actions */}
    <View className="flex-row justify-between items-center mt-3 pt-2 border-t border-gray-50">
      {/* Quantity Control */}
      <View className="flex-row items-center bg-gray-100 rounded-full px-2 py-1">
        <TouchableOpacity className="p-1">
          <Minus size={14} color="black" />
        </TouchableOpacity>
        <Text className="mx-3 font-bold text-black">{item.quantity}</Text>
        <TouchableOpacity className="p-1">
          <Plus size={14} color="black" />
        </TouchableOpacity>
      </View>

      {/* Actions */}
      <View className="flex-row gap-4">
        <TouchableOpacity>
          <Bookmark size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Trash2 size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

// --- COMPONENT: CUSTOM SLIDER (Visual Only) ---
const DeliverySlider = () => (
  <View className="mt-4 mb-2">
    <View className="flex-row justify-between mb-2">
      <Text className="text-gray-600 text-sm font-medium">
        Set your delivery price
      </Text>
      <Text className="text-green-600 font-bold text-base">850 DA</Text>
    </View>

    {/* Fake Slider Track */}
    <View className="h-2 bg-gray-200 rounded-full w-full relative justify-center">
      {/* Active Track */}
      <View className="h-2 bg-gray-300 rounded-full w-1/2" />
      {/* Thumb */}
      <View className="absolute left-[48%] w-5 h-5 bg-green-600 rounded-full border-2 border-white shadow-sm" />
    </View>

    <View className="flex-row justify-between mt-1">
      <Text className="text-gray-400 text-[10px]">500 DA</Text>
      <Text className="text-gray-400 text-[10px]">1500 DA</Text>
    </View>
  </View>
);

// --- MAIN SCREEN ---
const CartScreen = () => {
  const router = useRouter();
  const [deliveryType, setDeliveryType] = useState<"Pickup" | "Delivery">(
    "Delivery"
  );

  return (
    <View className="flex-1 bg-[#F6F8FA]">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* HEADER */}
      <ImageBackground
        source={require("@/assets/images/Frame3384411.png")}
        className="w-full pt-14 pb-4 bg-white shadow-sm rounded-b-[30px] z-10"
        resizeMode="cover"
      >
        <View className="flex-row items-center justify-between px-5">
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={28} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-black">Cart</Text>
          <View className="w-7" />
        </View>
      </ImageBackground>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 260 }} // Space for fixed footer
        showsVerticalScrollIndicator={false}
      >
        {/* Cart Items */}
        <View className="mt-5">
          {CART_ITEMS.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </View>

        {/* Delivery Options */}
        <View className="px-5 mt-2">
          <Text className="text-lg font-bold text-black mb-3">
            Delivery Options
          </Text>

          {/* Toggle Switch */}
          <View className="flex-row gap-4 mb-5">
            <TouchableOpacity
              onPress={() => setDeliveryType("Pickup")}
              className={`flex-1 py-3 rounded-full border ${
                deliveryType === "Pickup"
                  ? "bg-[#FCD34D] border-[#FCD34D]"
                  : "bg-transparent border-gray-200"
              }`}
            >
              <Text
                className={`text-center font-bold ${deliveryType === "Pickup" ? "text-black" : "text-gray-400"}`}
              >
                Self Pickup
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setDeliveryType("Delivery")}
              className={`flex-1 py-3 rounded-full border ${
                deliveryType === "Delivery"
                  ? "bg-[#FCD34D] border-[#FCD34D]"
                  : "bg-transparent border-[#FCD34D]" // Matching outline color from image
              }`}
            >
              <Text
                className={`text-center font-bold ${deliveryType === "Delivery" ? "text-black" : "text-[#FCD34D]"}`}
              >
                Home Delivery
              </Text>
            </TouchableOpacity>
          </View>

          {/* Delivery Details Card */}
          {deliveryType === "Delivery" && (
            <View className="bg-white p-4 rounded-2xl shadow-sm">
              <Text className="text-gray-400 text-xs mb-2">Deliver to</Text>

              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center flex-1 mr-2">
                  <MapPin size={20} color="black" className="mr-2" />
                  <Text className="text-black font-bold text-sm flex-1 leading-5">
                    123 Rue Didouche Mourad, Alger Centre
                  </Text>
                </View>
                <ChevronRight size={20} color="gray" />
              </View>

              <View className="h-[1px] bg-gray-100 w-full mb-2" />

              {/* Slider Section */}
              <DeliverySlider />

              {/* Driver Interest Pill */}
              <View className="bg-green-100 self-center px-10 py-2 rounded-full mt-2 w-full">
                <Text className="text-green-700 font-bold text-center">
                  Driver Interest: <Text className="font-extrabold">High</Text>
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* --- FOOTER: ORDER SUMMARY --- */}
      <View className="absolute bottom-0 w-full bg-white rounded-t-[30px] shadow-2xl p-6 pb-8">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-400 text-sm">Subtotal</Text>
          <Text className="text-black font-bold">5,700 DA</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-400 text-sm">Shipping</Text>
          <Text className="text-black font-bold">850 DA</Text>
        </View>
        <View className="flex-row justify-between mb-4">
          <Text className="text-gray-400 text-sm">Tax(19%)</Text>
          <Text className="text-black font-bold">1,083 DA</Text>
        </View>

        <View className="h-[1px] bg-gray-100 w-full mb-4 border-dashed" />

        <View className="flex-row justify-between mb-6">
          <Text className="text-black text-xl font-bold">Total:</Text>
          <Text className="text-green-600 text-xl font-extrabold">
            7,633 DA
          </Text>
        </View>

        <TouchableOpacity className="bg-green-500 py-4 rounded-full shadow-lg shadow-green-200">
          <Text className="text-white text-center font-bold text-lg">
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
