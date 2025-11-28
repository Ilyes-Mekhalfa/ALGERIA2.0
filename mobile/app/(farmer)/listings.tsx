import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Plus, Star, BarChart2 } from 'lucide-react-native';

// --- Reusable Product Card Component ---

const ProductCard = ({ name, quantity, status, offers, views, date }) => {
  const statusStyles = {
    Active: { bg: 'bg-green-100', text: 'text-green-800' },
    Draft: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    Completed: { bg: 'bg-gray-200', text: 'text-gray-800' },
  };

  const currentStatus = statusStyles[status] || statusStyles.Draft;

  return (
    <TouchableOpacity className="bg-white p-4 rounded-2xl border border-gray-200 mb-4 shadow-sm">
      {/* Top Section: Name and Status */}
      <View className="flex-row justify-between items-start mb-3">
        <Text className="text-xl font-bold text-gray-800 w-3/4">{name}</Text>
        <View className={`px-3 py-1 rounded-full ${currentStatus.bg}`}>
          <Text className={`text-xs font-bold ${currentStatus.text}`}>{status.toUpperCase()}</Text>
        </View>
      </View>

      {/* Middle Section: Quantity and Date */}
      <View className="mb-4">
        <Text className="text-base text-gray-600">{quantity}</Text>
        <Text className="text-sm text-gray-400">Listed: {date}</Text>
      </View>

      {/* Bottom Section: Stats */}
      <View className="flex-row items-center pt-3 border-t border-gray-100">
        <View className="flex-row items-center mr-6">
          <Star color="#f59e0b" size={18} />
          <Text className="ml-2 text-base font-semibold text-gray-700">{offers} Offers</Text>
        </View>
        <View className="flex-row items-center">
          <BarChart2 color="#6b7280" size={18} />
          <Text className="ml-2 text-base font-semibold text-gray-700">{views} Views</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};


// --- Main Products Screen Component ---

const ProductsScreen = () => {
  const [activeTab, setActiveTab] = useState('Active');

  // Mock data for the lists
  const mockData = {
    Active: [
      { id: '1', name: 'Roma Tomatoes', quantity: '10 Tons', status: 'Active', offers: 5, views: 120, date: '3 days ago' },
      { id: '2', name: 'Durum Wheat (Grade A)', quantity: '50 Tons', status: 'Active', offers: 2, views: 85, date: '1 day ago' },
    ],
    Draft: [
      { id: '3', name: 'New Season Olive Oil', quantity: '500 Liters', status: 'Draft', offers: 0, views: 5, date: '2 hours ago' },
    ],
    Completed: [
      { id: '4', name: 'Bell Peppers', quantity: '5 Tons', status: 'Completed', offers: 8, views: 250, date: '2 weeks ago' },
    ],
  };

  const Tab = ({ name }) => (
    <TouchableOpacity onPress={() => setActiveTab(name)}>
      <View className={`py-3 px-4 rounded-full ${activeTab === name ? 'bg-green-700' : ''}`}>
        <Text className={`font-bold text-base ${activeTab === name ? 'text-white' : 'text-gray-500'}`}>{name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* --- Header --- */}
      <View className="flex-row justify-between items-center p-6 border-b border-gray-200 bg-white">
        <Text className="text-3xl font-bold text-gray-800">My Products</Text>
        <TouchableOpacity className="bg-green-700 p-3 rounded-full shadow-lg shadow-green-900/30">
          <Plus color="#fff" size={24} strokeWidth={3} />
        </TouchableOpacity>
      </View>

      {/* --- Tab Navigator --- */}
      <View className="flex-row justify-around items-center p-2 bg-gray-100">
        <Tab name="Active" />
        <Tab name="Draft" />
        <Tab name="Completed" />
      </View>

      {/* --- Product List --- */}
      <FlatList
        data={mockData[activeTab]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard {...item} />}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
            <View className="items-center justify-center mt-20">
                <Text className="text-lg text-gray-500">No products in this category.</Text>
            </View>
        }
      />
    </SafeAreaView>
  );
};

export default ProductsScreen;
