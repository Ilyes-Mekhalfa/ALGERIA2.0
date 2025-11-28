import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, Text, TextInput, FlatList } from 'react-native';
import { Search, ArrowUp, ArrowDown } from 'lucide-react-native';
import SearchBar from '@/components/SearchBar';

// --- Reusable Price Card Component ---

const PriceCard = ({ name, avgPrice, unit, change, high, low, updated }) => {
  const isPositive = change >= 0;

  return (
    <View className="bg-white p-4 rounded-2xl border border-gray-200 mb-4 shadow-sm">
      {/* Top Section: Name and Price */}
      <View className="flex-row justify-between items-start mb-3">
        <Text className="text-xl font-bold text-gray-800 w-2/3">{name}</Text>
        <View className="items-end">
          <Text className="text-2xl font-bold text-green-800">{avgPrice.toFixed(2)}</Text>
          <Text className="text-sm font-medium text-gray-500">DZD / {unit}</Text>
        </View>
      </View>

      {/* Bottom Section: Stats and Trend */}
      <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
        {/* Trend Indicator */}
        <View className={`flex-row items-center px-3 py-1 rounded-full ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
          {isPositive ? (
            <ArrowUp color="#166534" size={16} />
          ) : (
            <ArrowDown color="#991b1b" size={16} />
          )}
          <Text className={`ml-1 text-base font-bold ${isPositive ? 'text-green-800' : 'text-red-800'}`}>
            {Math.abs(change).toFixed(1)}%
          </Text>
        </View>

        {/* High / Low Range */}
        <View className="items-end">
            <Text className="text-sm font-semibold text-gray-700">High: {high.toFixed(2)} / Low: {low.toFixed(2)}</Text>
            <Text className="text-xs text-gray-400">Updated: {updated}</Text>
        </View>
      </View>
    </View>
  );
};


// --- Main Market Prices Screen Component ---

const MarketPricesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for the market prices. In a real app, this would come from an API.
  const marketData = [
    { id: '1', name: 'Roma Tomatoes', avgPrice: 55.50, unit: 'kg', change: 2.5, high: 60.00, low: 52.00, updated: 'Just now' },
    { id: '2', name: 'Durum Wheat (Grade A)', avgPrice: 7800.00, unit: 'Quintal', change: -1.2, high: 8100.00, low: 7750.00, updated: '10 mins ago' },
    { id: '3', name: 'New Season Olive Oil', avgPrice: 950.00, unit: 'Liter', change: 5.8, high: 1000.00, low: 920.00, updated: '1 hour ago' },
    { id: '4', name: 'Bell Peppers', avgPrice: 85.00, unit: 'kg', change: 0.5, high: 90.00, low: 82.00, updated: 'Just now' },
    { id: '5', name: 'Potatoes', avgPrice: 42.00, unit: 'kg', change: -3.1, high: 48.00, low: 40.00, updated: '2 hours ago' },
  ];

  // useMemo will re-calculate the filtered list only when the data or search query changes.
  const filteredData = useMemo(() => {
    if (!searchQuery) return marketData;
    return marketData.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, marketData]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* --- Header --- */}
      <View className="p-6 pb-4 bg-white border-b border-gray-200">
        <Text className="text-3xl font-bold text-gray-800 mb-4">Market Prices</Text>
        
        {/* --- Search Bar --- */}
        <SearchBar placeholder="Search products..." value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      {/* --- Price List --- */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PriceCard {...item} />}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
            <View className="items-center justify-center mt-20">
                <Text className="text-lg text-gray-500">No products found for "{searchQuery}".</Text>
            </View>
        }
      />
    </SafeAreaView>
  );
};

export default MarketPricesScreen;
