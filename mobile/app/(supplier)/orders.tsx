import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';

// --- Reusable Purchase Order Card Component ---
const PurchaseOrderCard = ({ order }) => {
  const { farmer, id, date, value, status, product } = order;

  const statusStyles = {
    'Pending Farmer': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    'Awaiting Pickup': { bg: 'bg-blue-100', text: 'text-blue-800' },
    'In Transit': { bg: 'bg-indigo-100', text: 'text-indigo-800' },
    Completed: { bg: 'bg-green-100', text: 'text-green-800' },
  };
  const currentStatus = statusStyles[status] || statusStyles.Completed;

  return (
    <View className="bg-white p-4 rounded-2xl border border-gray-200 mb-4 shadow-sm">
      <View className="flex-row justify-between items-start mb-2">
        <View>
          <Text className="text-sm text-gray-500">Order from {farmer}</Text>
          <Text className="text-xl font-bold text-gray-800">{product}</Text>
        </View>
        <View className={`px-3 py-1 rounded-full ${currentStatus.bg}`}>
          <Text className={`text-xs font-bold ${currentStatus.text}`}>{status.toUpperCase()}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center my-2">
        <Text className="text-2xl font-bold text-green-800">{value.toLocaleString('en-US')} DZD</Text>
        <Text className="text-sm font-semibold text-gray-500">{date}</Text>
      </View>

      <View className="pt-3 border-t border-gray-100">
        <Text className="text-sm text-gray-500">Next Step: {status === 'Pending Farmer' ? 'Awaiting farmer acceptance' : 'Schedule pickup with logistics'}</Text>
      </View>
    </View>
  );
};

// --- Main Supplier Orders Screen Component ---
const SupplierOrdersScreen = () => {
  const [activeFilter, setActiveFilter] = useState('Pending Farmer');

  const mockOrders = [
    { id: 'PO-101', farmer: 'Ahmed Farms', product: '500kg of Tomatoes', date: 'Nov 28, 2025', value: 27500, status: 'Pending Farmer' },
    { id: 'PO-102', farmer: 'Fatima\'s Fields', product: '10 Quintals of Wheat', date: 'Nov 27, 2025', value: 78000, status: 'Awaiting Pickup' },
    { id: 'PO-103', farmer: 'Kabylie Orchards', product: '50L of Olive Oil', date: 'Nov 26, 2025', value: 47500, status: 'Awaiting Pickup' },
    { id: 'PO-104', farmer: 'Ahmed Farms', product: '200kg of Bell Peppers', date: 'Nov 25, 2025', value: 17000, status: 'In Transit' },
    { id: 'PO-105', farmer: 'Fatima\'s Fields', product: '100 Quintals of Wheat', date: 'Nov 20, 2025', value: 780000, status: 'Completed' },
  ];
  
  const filters = ['Pending Farmer', 'Awaiting Pickup', 'In Transit', 'Completed'];

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => order.status === activeFilter);
  }, [activeFilter, mockOrders]);

  const FilterTab = ({ name }) => {
    const count = mockOrders.filter(order => order.status === name).length;
    const isActive = activeFilter === name;
    return (
      <TouchableOpacity onPress={() => setActiveFilter(name)} className="items-center">
        <Text className={`text-lg font-bold ${isActive ? 'text-green-700' : 'text-gray-500'}`}>
          {name} ({count})
        </Text>
        {isActive && <View className="h-1 w-8 bg-green-700 rounded-full mt-1" />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-6 bg-white border-b border-gray-200">
        <Text className="text-3xl font-bold text-gray-800">My Purchase Orders</Text>
      </View>
      
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 20 }}>
            {filters.map(filter => <FilterTab key={filter} name={filter} />)}
        </ScrollView>
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PurchaseOrderCard order={item} />}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className="items-center justify-center mt-20">
            <Text className="text-lg text-gray-500">No orders in this category.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default SupplierOrdersScreen;
