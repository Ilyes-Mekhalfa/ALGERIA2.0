import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Star, Plus, Truck, Wallet, BarChart2 } from 'lucide-react-native';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Reusable Components (No 'styled' HOC needed) ---

const ActionCard = ({ title, description, buttonText, icon: Icon, color }) => (
  // Using TouchableOpacity directly with className
  <TouchableOpacity className={`bg-${color}-100 p-4 rounded-2xl border border-${color}-200 mb-6`}>
    <View className="flex-row items-center mb-2">
      <Icon color={color === 'green' ? '#166534' : '#f59e0b'} size={20} />
      <Text className={`ml-2 text-lg font-bold text-${color}-800`}>{title}</Text>
    </View>
    <Text className="text-base text-gray-600 mb-4">{description}</Text>
    <TouchableOpacity className={`bg-${color}-600 py-3 rounded-xl`}>
      <Text className="text-center text-white font-bold text-base">{buttonText}</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const ProductStatusCard = ({ productName, quantity, offers, views }) => (
  <TouchableOpacity className="bg-white p-4 rounded-2xl border border-gray-200 mb-3">
    <View className="flex-row justify-between items-center">
      <View>
        <Text className="text-lg font-bold text-gray-800">{productName}</Text>
        <Text className="text-sm text-gray-500">{quantity}</Text>
      </View>
      <View className="flex-row items-center">
        <View className="flex-row items-center mr-4">
          <Star color="#f59e0b" size={16} />
          <Text className="ml-1 text-base font-semibold text-gray-700">{offers}</Text>
        </View>
        <View className="flex-row items-center">
          <BarChart2 color="#6b7280" size={16} />
          <Text className="ml-1 text-base font-semibold text-gray-700">{views}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const ScheduleItem = ({ icon: Icon, title, description, color }) => (
  <View className="flex-row items-center mb-4">
    <View className={`w-12 h-12 rounded-full items-center justify-center bg-${color}-100 mr-4`}>
      <Icon color={color === 'green' ? '#166534' : '#4b5563'} size={24} />
    </View>
    <View className="flex-1">
      <Text className="text-base font-bold text-gray-800">{title}</Text>
      <Text className="text-sm text-gray-600">{description}</Text>
    </View>
  </View>
);



const index = () => {

  const newOffersAvailable = true;
  const username = "Ahmed";
  const earnings = "2,150,000 DZD";

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header />
      <ScrollView className="p-6">
        {/* Header */}
        <Text className="text-2xl font-bold text-gray-800 mb-6">Welcome back, {username}</Text>

        {/* --- Actionable Cards --- */}
        {newOffersAvailable && (
          <ActionCard
            icon={Star}
            title="NEW OFFERS REQUESTED (2)"
            description="Factory Al-Amal has made an offer on your tomato."
            buttonText="Review Offers Now"
            color="green"
          />
        )}

        {/* --- Primary Action Button --- */}
        <TouchableOpacity className="bg-green-700 p-5 rounded-2xl flex-row justify-center items-center mb-8 shadow-lg shadow-green-900/30">
          <Plus color="#fff" size={24} strokeWidth={3} />
          <Text className="text-white text-lg font-bold ml-2">PUBLISH YOUR HARVEST</Text>
        </TouchableOpacity>

        {/* --- Live Listings --- */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Your Published Products</Text>
          <ProductStatusCard productName="Tomatoes" quantity="10 tons" offers={5} views={120} />
          <ProductStatusCard productName="Cucumbers" quantity="50 tons" offers={2} views={85} />
        </View>

        {/* --- Upcoming Schedule --- */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Your Schedule</Text>
          <ScheduleItem
            icon={Truck}
            title="Pickup Today, 4 PM"
            description="Order #245 - 20 tons of wheat for Factory Nour."
            color="gray"
          />
          <ScheduleItem
            icon={Wallet}
            title="Payment Expected Tomorrow"
            description="650,000 DZD for completed Order #241."
            color="green"
          />
        </View>
        
        {/* --- Earnings Snapshot --- */}
        <View className="bg-green-800 p-6 rounded-2xl items-center justify-center mb-10">
            <Text className="text-lg font-semibold text-green-200 mb-1">Total Earnings This Season</Text>
            <Text className="text-4xl font-bold text-white">{earnings}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
