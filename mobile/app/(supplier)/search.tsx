import React, { useState } from "react";
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
import { Star, Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/SearchBar"; // Assuming you have this component

// --- MOCK DATA SECTION ---

const MOCK_PRODUCTS = [
  { 
    _id: "1", 
    name: "Fresh Apples", 
    farmerName: "Green Valley", 
    rating: 4.8, 
    price: 250, 
    stock: 120, 
    unit: 'kg', 
    quality: 'A', 
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500' 
  },
  { 
    _id: "2", 
    name: "Organic Tomatoes", 
    farmerName: "Sunnyside Farm", 
    rating: 4.9, 
    price: 180, 
    stock: 80, 
    unit: 'kg', 
    quality: 'Organic', 
    imageUrl: 'https://images.unsplash.com/photo-1561155628-d2e4b830bba3?w=500' 
  },
  { 
    _id: "3", 
    name: "Fresh Milk", 
    farmerName: "Happy Cow Dairy", 
    rating: 4.7, 
    price: 90, 
    stock: 40, 
    unit: 'Liter', 
    // This product has no quality to test the conditional rendering
    imageUrl: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=500' 
  },
  { 
    _id: "4", 
    name: "Crisp Potatoes", 
    farmerName: "Earthly Goods", 
    rating: 4.6, 
    price: 60, 
    stock: 200, 
    unit: 'kg', 
    quality: 'B', 
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba657?w=500'
  },
];

const FILTERS = ["Most ordered", "Organic", "In stock", "Rating 4.0+"];

const CATEGORIES = [
  { id: "1", name: "Fruits", color: "bg-orange-100", icon: "🍎" },
  { id: "2", name: "Vegetables", color: "bg-green-100", icon: "🥦" },
  { id: "3", name: "Dairy", color: "bg-yellow-100", icon: "🧀" },
  { id: "4", name: "Meat", color: "bg-red-100", icon: "🥩" },
];

const FALLBACK_IMAGE_URL = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500";

// --- REUSABLE COMPONENTS (defined within the file for completeness) ---

const ProductCard = ({ item }) => {
  if (!item) return null;
  const imageUrl = item.imageUrl || FALLBACK_IMAGE_URL;
  return (
    <View className="bg-white rounded-3xl p-3 mr-4 w-44 shadow-sm border border-gray-100">
      <Image
        source={{ uri: imageUrl }}
        className="w-full h-32 rounded-2xl mb-3"
        resizeMode="cover"
      />
      <Text className="text-lg font-bold text-black mb-1" numberOfLines={1}>{item.name || "Product"}</Text>
      <View className="flex-row items-center mb-3">
        <View className="w-6 h-6 bg-gray-300 rounded-full mr-2" />
        <View>
          <Text className="text-xs text-gray-800 font-medium">{item.farmerName || "Farmer"}</Text>
          <View className="flex-row items-center">
            <Star size={10} color="#FFB800" fill="#FFB800" />
            <Text className="text-xs text-gray-500 ml-1">{item.rating || "N/A"}</Text>
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-gray-800 font-bold text-sm">{item.price ?? 0} DZD</Text>
        <TouchableOpacity className="bg-orange-400 p-2 rounded-xl">
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CategoryCard = ({ item }) => (
  <TouchableOpacity
    className={`mr-4 items-center justify-center rounded-3xl w-28 h-28 ${item.color}`}
  >
    <Text className="text-3xl mb-2">{item.icon}</Text>
    <Text className="text-black font-semibold">{item.name}</Text>
  </TouchableOpacity>
);

const FilterChip = ({ label }) => (
  <TouchableOpacity className="bg-gray-200 px-5 py-2 rounded-full mr-3">
    <Text className="text-gray-600 font-medium">{label}</Text>
  </TouchableOpacity>
);

// --- MAIN SCREEN COMPONENT ---
const SearchScreen = () => {
  const [query, setQuery] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-green-50/30">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        className="flex-1 px-5 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search fresh products..."
        />
        
        {/* Filter Chips Section */}
        <View className="my-8">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {FILTERS.map((filter, index) => (
              <FilterChip key={index} label={filter} />
            ))}
          </ScrollView>
        </View>

        {/* Section 1: Products (from Mock Data) */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-black mb-4">
            Fresh on the Market
          </Text>
          <FlatList
            data={MOCK_PRODUCTS}
            renderItem={({ item }) => <ProductCard item={item} />}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 5, paddingRight: 20 }}
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

        {/* Visual spacer */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
