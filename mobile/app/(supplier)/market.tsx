import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Search, SlidersHorizontal, Star } from 'lucide-react-native';

// --- Reusable Farmer Product Card Component ---
const FarmerProductCard = ({ product }) => {
  const { name, farmer, rating, price, unit, available, image } = product;
  
  return (
    <View className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-5">
      <Image source={{ uri: image }} className="w-full h-40" />
      <View className="p-4">
        <Text className="text-xl font-bold text-gray-800 mb-1">{name}</Text>
        
        {/* Farmer Info and Rating */}
        <View className="flex-row items-center mb-3">
          <Text className="text-sm text-gray-500 mr-2">From {farmer}</Text>
          <Star color="#f59e0b" fill="#f59e0b" size={14} />
          <Text className="text-sm font-semibold text-gray-600 ml-1">{rating.toFixed(1)}</Text>
        </View>

        {/* Price and Quantity */}
        <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold text-green-800">{price}<Text className="text-base font-normal text-gray-500"> DZD/{unit}</Text></Text>
            <Text className="text-base font-semibold text-gray-700">~{available} {unit}s avail.</Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity className="bg-green-700 py-3 rounded-xl">
          <Text className="text-center text-white font-bold text-base">Make Offer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Main Supplier Market Screen Component ---
const SupplierMarketScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const mockProducts = [
    { id: '1', name: 'Fresh Roma Tomatoes', farmer: 'Ahmed Farms', rating: 4.8, price: 55, unit: 'kg', available: 500, image: 'https://images.unsplash.com/photo-1561155628-d2e4b830bba3?w=500' },
    { id: '2', name: 'Organic Durum Wheat', farmer: 'Fatima\'s Fields', rating: 4.9, price: 7800, unit: 'Quintal', available: 100, image: 'https://images.unsplash.com/photo-1503918738-34858f6917a4?w=500' },
    { id: '3', name: 'Extra Virgin Olive Oil', farmer: 'Kabylie Orchards', rating: 4.7, price: 950, unit: 'Liter', available: 200, image: 'https://images.unsplash.com/photo-1626186402855-38f53351b6a7?w=500' },
  ];

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, mockProducts]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header, Search, and Filters */}
      <View className="p-6 pb-4 bg-white border-b border-gray-200">
        <Text className="text-3xl font-bold text-gray-800 mb-4">Farmer's Market</Text>
        <View className="flex-row items-center space-x-2">
          <View className="flex-1 flex-row items-center bg-gray-100 p-3 rounded-2xl">
            <Search color="#6b7280" size={20} />
            <TextInput
              className="flex-1 ml-3 text-base"
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity className="p-3 bg-gray-100 rounded-2xl">
            <SlidersHorizontal color="#6b7280" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FarmerProductCard product={item} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

export default SupplierMarketScreen;
