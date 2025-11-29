import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  TextInput,
  ScrollView, // Import TextInput for the new field
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeft,
  Star,
  Minus,
  Plus,
  Bookmark,
  Trash2,
  Percent, // New icon for profit margin
} from "lucide-react-native";
import { useRouter } from "expo-router";

// --- MOCK DATA (Now used as initial state) ---
const INITIAL_CART_ITEMS = [
  {
    id: "1",
    name: "Tomato",
    seller: "Fatima Produce, Oran",
    rating: 4.2,
    price: 10000,
    unit: "DA/q",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "2",
    name: "Fresh Bell Peppers",
    seller: "Fatima Produce, Oran",
    rating: 4.2,
    price: 2300,
    unit: "DA/Box",
    quantity: 2,
    image: "https://images.unsplash.com/photo-1563565375-f3fdf5dbc240?auto=format&fit=crop&w=200&q=80",
  },
];

// --- COMPONENT: CART ITEM (Now functional) ---
const CartItem = ({ item, onQuantityChange }) => {
  const getStatusColor = (status) => "bg-gray-100 text-gray-600"; // Simplified
  const statusStyle = getStatusColor("n/a");

  return (
    <View className="bg-white rounded-2xl p-3 mb-4 shadow-sm mx-5">
      <View className="flex-row">
        <Image
          source={{ uri: item.image }}
          className="w-24 h-24 rounded-xl bg-gray-100"
          resizeMode="cover"
        />
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-black font-bold text-lg">{item.name}</Text>
              <Text className="text-gray-400 text-xs mb-1">{item.seller}</Text>
              <View className="flex-row items-center mb-1">
                <Star size={12} color="#FBBF24" fill="#FBBF24" />
                <Text className="text-xs text-black font-bold ml-1">{item.rating}</Text>
              </View>
            </View>
          </View>
          <Text className="text-green-600 font-bold text-base mt-1">
            {item.price.toLocaleString()}{" "}
            <Text className="text-gray-400 text-xs font-normal">{item.unit}</Text>
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center mt-3 pt-2 border-t border-gray-50">
        <View className="flex-row items-center bg-gray-100 rounded-full px-2 py-1">
          {/* --- Made quantity buttons functional --- */}
          <TouchableOpacity onPress={() => onQuantityChange(item.id, item.quantity - 1)} className="p-1.5">
            <Minus size={14} color="black" />
          </TouchableOpacity>
          <Text className="mx-3 font-bold text-black text-base">{item.quantity}</Text>
          <TouchableOpacity onPress={() => onQuantityChange(item.id, item.quantity + 1)} className="p-1.5">
            <Plus size={14} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row gap-4">
          <TouchableOpacity><Bookmark size={20} color="black" /></TouchableOpacity>
          <TouchableOpacity><Trash2 size={20} color="#EF4444" /></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


// --- MAIN SCREEN ---
const OrderCreationScreen = () => {
  const router = useRouter();

  // --- STATE MANAGEMENT ---
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [profitMargin, setProfitMargin] = useState("15"); // Default profit margin of 15%

  // --- DYNAMIC CALCULATIONS ---
  const subtotal = useMemo(() => 
    cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    [cartItems]
  );

  const profitAmount = useMemo(() =>
    subtotal * ((parseFloat(profitMargin) || 0) / 100),
    [subtotal, profitMargin]
  );

  const total = useMemo(() =>
    subtotal + profitAmount,
    [subtotal, profitAmount]
  );
  // -------------------------

  const handleQuantityChange = (itemId, newQuantity) => {
    // Ensure quantity doesn't go below 1
    const validQuantity = Math.max(1, newQuantity);
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity: validQuantity } : item
      )
    );
  };

  return (
    <View className="flex-1 bg-[#F6F8FA]">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
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
          <Text className="text-xl font-bold text-black">Create Order</Text>
          <View className="w-7" />
        </View>
      </ImageBackground>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 260 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Cart Items */}
        <View className="mt-5">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onQuantityChange={handleQuantityChange} />
          ))}
        </View>

        {/* --- NEW PROFIT MARGIN SECTION --- */}
        <View className="px-5 mt-4">
          <Text className="text-lg font-bold text-black mb-3">
            Pricing & Profit
          </Text>
          <View className="bg-white p-4 rounded-2xl shadow-sm">
            <Text className="text-base text-gray-600 mb-2">Set Your Profit Margin</Text>
            <View className="flex-row items-center bg-gray-100 p-3 rounded-xl border border-gray-200">
              <TextInput
                className="flex-1 text-lg font-bold text-gray-800"
                value={profitMargin}
                onChangeText={setProfitMargin}
                placeholder="e.g., 15"
                keyboardType="numeric"
              />
              <Percent size={20} color="#4b5563" />
            </View>
          </View>
        </View>
        {/* --------------------------------- */}

      </ScrollView>

      {/* --- FOOTER: DYNAMIC ORDER SUMMARY --- */}
      <View className="absolute bottom-0 w-full bg-white rounded-t-[30px] shadow-2xl p-6 pb-8">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500 text-base">Subtotal</Text>
          <Text className="text-black font-bold text-base">{subtotal.toLocaleString()} DA</Text>
        </View>
        <View className="flex-row justify-between mb-4">
          <Text className="text-gray-500 text-base">Profit ({profitMargin || 0}%)</Text>
          <Text className="text-black font-bold text-base">{profitAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DA</Text>
        </View>
        <View className="h-[1px] bg-gray-100 w-full mb-4 border-dashed" />
        <View className="flex-row justify-between mb-6">
          <Text className="text-black text-xl font-bold">Total Price:</Text>
          <Text className="text-green-600 text-xl font-extrabold">
            {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DA
          </Text>
        </View>
        <TouchableOpacity className="bg-green-500 py-4 rounded-full shadow-lg shadow-green-200">
          <Text className="text-white text-center font-bold text-lg">
            Finalize Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderCreationScreen;
