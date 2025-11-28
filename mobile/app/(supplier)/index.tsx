import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, FileText, Package, Truck, CheckCircle, CreditCard, ChevronRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';

// --- Reusable Components for the Dashboard ---

// Large card for primary actions like new orders or tenders
const ActionCard = ({ icon: Icon, title, description, buttonText, color }) => (
  <TouchableOpacity className={`bg-${color}-50 p-5 rounded-2xl border border-${color}-200 mb-4`}>
    <View className="flex-row items-start">
      <View className={`bg-${color}-100 p-3 rounded-full mr-4`}>
        <Icon color={color === 'green' ? '#166534' : '#1e40af'} size={24} />
      </View>
      <View className="flex-1">
        <Text className={`text-lg font-bold text-${color}-800`}>{title}</Text>
        <Text className="text-base text-gray-600 mt-1">{description}</Text>
      </View>
    </View>
    <TouchableOpacity className={`bg-${color}-600 py-3 rounded-xl mt-4`}>
      <Text className="text-center text-white font-bold text-base">{buttonText}</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

// Small card for the "Order Pipeline" summary
const StatCard = ({ icon: Icon, label, value }) => (
  <View className="bg-white border border-gray-200 rounded-2xl p-4 w-36 mr-3 items-center justify-center">
    <View className="bg-gray-100 p-3 rounded-full mb-2">
      <Icon color="#4b5563" size={24} />
    </View>
    <Text className="text-3xl font-bold text-gray-800">{value}</Text>
    <Text className="text-sm text-gray-500 font-semibold">{label}</Text>
  </View>
);

// A simple bar for the chart visualization
const ChartBar = ({ day, amount, total, color }) => {
    const heightPercentage = Math.max((amount / total) * 100, 5); // Ensure a minimum height
    return (
        <View className="flex-1 items-center">
            <View className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden justify-end">
                <View style={{ height: `${heightPercentage}%` }} className={`w-full bg-${color}-400`}></View>
            </View>
            <Text className="text-xs font-bold text-gray-500 mt-2">{day}</Text>
        </View>
    );
};


// --- Main Supplier Home Screen Component ---
const SupplierHomeScreen = () => {
  const companyName = "Prime Packaging Inc.";
  const weeklyRevenue = 4200000;
  const chartData = [
      { day: 'Mon', amount: 500000 },
      { day: 'Tue', amount: 850000 },
      { day: 'Wed', amount: 600000 },
      { day: 'Thu', amount: 1200000 },
      { day: 'Fri', amount: 1050000 },
  ];
  const maxRevenue = Math.max(...chartData.map(d => d.amount));

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header />
      <ScrollView contentContainerStyle={{ paddingVertical: 24 }}>
        {/* --- Header --- */}
        <View className="px-6 mb-6">
          <Text className="text-3xl font-bold text-gray-800">Welcome back,</Text>
          <Text className="text-2xl text-gray-500">{companyName}</Text>
        </View>

        {/* --- Action Cards --- */}
        <View className="px-6">
          <ActionCard
            icon={Bell}
            title="New Order Received!"
            description="Factory Al-Amal has placed an order for 5,000 glass bottles."
            buttonText="Review & Accept"
            color="green"
          />
          <ActionCard
            icon={FileText}
            title="4 New Tenders Available"
            description="Factories are looking for cardboard boxes and labels."
            buttonText="View Tenders"
            color="blue"
          />
        </View>

        {/* --- Order Pipeline --- */}
        <View className="mt-8">
            <Text className="text-xl font-bold text-gray-800 mb-4 px-6">Order Pipeline</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 24 }}>
                <StatCard icon={Package} label="To Prepare" value={3} />
                <StatCard icon={Truck} label="In Transit" value={1} />
                <StatCard icon={CheckCircle} label="Delivered" value={5} />
            </ScrollView>
        </View>

        {/* --- Weekly Revenue Chart --- */}
        <View className="mt-8 px-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">Weekly Revenue</Text>
            <View className="bg-white border border-gray-200 rounded-2xl p-4">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-3xl font-bold text-gray-800">{weeklyRevenue.toLocaleString('en-US')} DZD</Text>
                    <TouchableOpacity className="flex-row items-center">
                        <Text className="text-base font-semibold text-green-700">Details</Text>
                        <ChevronRight color="#166534" size={16} />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-between space-x-2">
                    {chartData.map(item => (
                        <ChartBar key={item.day} day={item.day} amount={item.amount} total={maxRevenue} color="green" />
                    ))}
                </View>
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default SupplierHomeScreen;
