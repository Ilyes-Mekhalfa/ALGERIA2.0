import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
  TextInput,
} from "react-native";
// Assuming you use Lucide or Vector Icons. If not, replace with standard Images/Text
import { Star, Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/SearchBar";

// --- MOCK DATA ---
const FILTERS = ["Most ordered", "Organic", "In stock", "Rating 4.0+"];

const RECENT_SEARCHES = [
  {
    id: "1",
    name: "Tomato",
    seller: "F.Carret",
    rating: 4.2,
    price: "250 DA/q",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80", // Placeholder
  },
  {
    id: "2",
    name: "Red Cherry",
    seller: "J.Doe",
    rating: 4.5,
    price: "400 DA/q",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "3",
    name: "Roma Tomato",
    seller: "A.Smith",
    rating: 3.9,
    price: "220 DA/q",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80",
  },
];

const CATEGORIES = [
  { id: "1", name: "Fruits", color: "bg-orange-100", icon: "🍎" },
  { id: "2", name: "Vegetables", color: "bg-green-100", icon: "🥦" },
  { id: "3", name: "Dairy", color: "bg-yellow-100", icon: "🧀" },
  { id: "4", name: "Meat", color: "bg-red-100", icon: "🥩" },
];

// --- COMPONENTS ---

const ProductCard = ({ item }: { item: (typeof RECENT_SEARCHES)[0] }) => (
  <View className="bg-white rounded-3xl p-3 mr-4 w-44 shadow-sm border border-gray-100">
    {/* Product Image */}
    <Image
      source={{ uri: item.image }}
      className="w-full h-32 rounded-2xl mb-3"
      resizeMode="cover"
    />

    {/* Title */}
    <Text className="text-lg font-bold text-black mb-1">{item.name}</Text>

    {/* Seller Info */}
    <View className="flex-row items-center mb-3">
      <View className="w-6 h-6 bg-gray-300 rounded-full mr-2" />
      <View>
        <Text className="text-xs text-gray-800 font-medium">{item.seller}</Text>
        <View className="flex-row items-center">
          <Star size={10} color="#FFB800" fill="#FFB800" />
          <Text className="text-xs text-gray-500 ml-1">{item.rating}</Text>
        </View>
      </View>
    </View>

    {/* Price & Add Button */}
    <View className="flex-row items-center justify-between">
      <Text className="text-gray-800 font-bold text-sm">{item.price}</Text>
      <TouchableOpacity className="bg-orange-400 p-2 rounded-xl">
        <Plus size={20} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

const CategoryCard = ({ item }: { item: (typeof CATEGORIES)[0] }) => (
  <TouchableOpacity
    className={`mr-4 items-center justify-center rounded-3xl w-28 h-28 ${item.color}`}
  >
    <Text className="text-3xl mb-2">{item.icon}</Text>
    <Text className="text-black font-semibold">{item.name}</Text>
  </TouchableOpacity>
);

const FilterChip = ({ label }: { label: string }) => (
  <TouchableOpacity className="bg-gray-200 px-5 py-2 rounded-full mr-3">
    <Text className="text-gray-600 font-medium">{label}</Text>
  </TouchableOpacity>
);

// --- MAIN SCREEN ---

const SearchScreen = () => {
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // We use a small timeout or InteractionManager to wait for the
    // navigation animation to finish before opening the keyboard.
    // This prevents the UI from stuttering.
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-green-50/30">
      <StatusBar barStyle="dark-content" />

      <ScrollView
        className="flex-1 px-5 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header: Search Bar */}
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search fresh products..."
        />

        {/* Filter Chips */}
        <View className="mb-8">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {FILTERS.map((filter, index) => (
              <FilterChip key={index} label={filter} />
            ))}
          </ScrollView>
        </View>

        {/* Section 1: Recent Searches */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-black mb-4">
            Based on Your Recent Searches
          </Text>
          <FlatList
            data={RECENT_SEARCHES}
            renderItem={({ item }) => <ProductCard item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          />
        </View>

        {/* Section 2: Suggested Categories */}
        <View>
          <Text className="text-xl font-bold text-black mb-4">
            Suggested Categories
          </Text>
          <FlatList
            data={CATEGORIES}
            renderItem={({ item }) => <CategoryCard item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          />
        </View>

        {/* Visual spacer for bottom navigation usually found in these apps */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
