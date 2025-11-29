import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  ScrollView, // Using ScrollView for the Active tab content
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bell,
  MessageCircle,
  SlidersHorizontal,
  MapPin,
  ArrowRight,
  Clock,
  CheckCircle2, // For "Picked up"
  Phone,
  MessageSquare,
  Navigation,
} from "lucide-react-native";

// --- MOCK DATA ---
const AVAILABLE_JOBS = [
  {
    id: "#AG-12345",
    pickup: "Ben Aknoun Warehouse, Algiers",
    delivery: "Hotel Berkane, Kouba, Algiers",
    cargo: "15q Fresh Produce",
    distance: "12.5 KM",
    time: "35 min",
    earning: "650 DA",
    isUrgent: true,
  },
  {
    id: "#AG-98765",
    pickup: "AgriCorp Farm, Blida",
    delivery: "Metro Supermarket, Algiers",
    cargo: "20q Potatoes",
    distance: "45.2 KM",
    time: "1h 10m",
    earning: "1200 DA",
    isUrgent: false,
  },
];

const ACTIVE_JOB = {
  id: "ORD-AG-2025-5420",
  eta: "18 min",
  distance: "8.3 KM",
  status: "In transit",
  cargo: "Dairy Products Shipment",
  pickedUp: "AgriCorp Farm, Blida",
  nextStop: "Metro Supermarket, Algiers",
  mapImage:
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80", // Placeholder map
};

const COMPLETED_TODAY = [
  {
    id: "DEL-2025-9835",
    from: "Ben Aknoun",
    to: "Algiers Center",
    time: "08:45",
    earning: "600 DA",
  },
  {
    id: "DEL-2025-9835",
    from: "Ben Aknoun",
    to: "Algiers Center",
    time: "08:45",
    earning: "600 DA",
  },
];

// --- COMPONENT: JOB CARD (FOR AVAILABLE JOBS) ---
const AvailableJobCard = ({ item }: { item: (typeof AVAILABLE_JOBS)[0] }) => (
  <View className="bg-white rounded-3xl p-5 mb-4 shadow-sm mx-5 border border-gray-100">
    {/* Header: ID + Tag */}
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-black font-extrabold text-lg">
        Job ID: {item.id}
      </Text>
      {item.isUrgent && (
        <View className="bg-red-50 px-3 py-1 rounded-full border border-red-100">
          <Text className="text-red-500 text-[10px] font-bold uppercase">
            Urgent
          </Text>
        </View>
      )}
    </View>

    {/* Locations */}
    <View className="mb-4">
      <View className="flex-row mb-2">
        <Text className="text-gray-500 font-medium w-16 text-xs">Pickup:</Text>
        <Text
          className="text-green-600 font-bold text-xs flex-1"
          numberOfLines={1}
        >
          {item.pickup}
        </Text>
      </View>
      <View className="flex-row mb-2">
        <Text className="text-gray-500 font-medium w-16 text-xs">
          Delivery:
        </Text>
        <Text
          className="text-green-600 font-bold text-xs flex-1"
          numberOfLines={1}
        >
          {item.delivery}
        </Text>
      </View>
      <Text className="text-gray-400 text-xs mt-1">{item.cargo}</Text>
    </View>

    {/* Distance & Time Strip */}
    <View className="flex-row items-center bg-[#FFF8E6] rounded-xl px-4 py-3 mb-4">
      <View className="flex-row items-center flex-1">
        <ArrowRight size={18} color="#D97706" className="mr-2" />
        <Text className="text-yellow-700 font-bold text-sm">
          {item.distance}
        </Text>
      </View>
      <Text className="text-black font-extrabold text-sm">{item.time}</Text>
    </View>

    {/* Footer: Earning + Button */}
    <View className="mb-2">
      <Text className="text-gray-400 text-xs font-medium mb-1">
        Your Earning
      </Text>
      <Text className="text-green-600 font-extrabold text-xl mb-4">
        {item.earning}
      </Text>

      <TouchableOpacity
        className="bg-[#22C55E] py-4 rounded-full items-center shadow-md shadow-green-200 active:bg-green-600"
        activeOpacity={0.8}
      >
        <Text className="text-white font-bold text-base uppercase tracking-wider">
          Accept Delivery
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

// --- COMPONENT: ACTIVE JOB VIEW ---
const ActiveJobView = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 100 }} // Ensure space for bottom nav
    className="flex-1 mt-4"
  >
    <View className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 mx-5">
      {/* Metrics Row (ETA / Distance / Status) */}
      <View className="flex-row justify-between items-center mb-6">
        <View className="items-center flex-1">
          <Text className="text-gray-400 text-[10px] uppercase font-bold mb-1">
            ETA
          </Text>
          <Text className="text-black font-bold text-lg">{ACTIVE_JOB.eta}</Text>
        </View>
        {/* Vertical Divider */}
        <View className="h-8 w-[1px] bg-gray-200" />
        <View className="items-center flex-1">
          <Text className="text-gray-400 text-[10px] uppercase font-bold mb-1">
            Distance
          </Text>
          <Text className="text-black font-bold text-lg">
            {ACTIVE_JOB.distance}
          </Text>
        </View>
        {/* Vertical Divider */}
        <View className="h-8 w-[1px] bg-gray-200" />
        <View className="items-center flex-1">
          <Text className="text-gray-400 text-[10px] uppercase font-bold mb-1">
            Status
          </Text>
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-600 text-[10px] font-bold">
              {ACTIVE_JOB.status}
            </Text>
          </View>
        </View>
      </View>

      {/* Job Info Header */}
      <View className="flex-row items-center mb-5">
        <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3">
          <Clock size={20} color="#EA580C" />
        </View>
        <View>
          <Text className="text-gray-400 text-xs font-medium">
            {ACTIVE_JOB.id}
          </Text>
          <Text className="text-black font-bold text-lg leading-6">
            {ACTIVE_JOB.cargo}
          </Text>
        </View>
      </View>

      {/* Map Preview Image */}
      <View className="h-40 w-full rounded-2xl overflow-hidden relative border border-gray-100">
        <Image
          source={{ uri: ACTIVE_JOB.mapImage }}
          className="w-full h-full opacity-80"
          resizeMode="cover"
        />
        <View className="absolute inset-0 items-center justify-center">
          <Text className="bg-white px-4 py-2 rounded-full text-black font-semibold text-xs shadow-md">
            Tap to view full map
          </Text>
        </View>
      </View>
    </View>

    {/* Delivery Route */}
    <View className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 mx-5 mt-4">
      <Text className="text-black font-bold text-lg mb-4">Delivery Route</Text>

      <View className="flex-row items-center mb-3">
        <CheckCircle2 size={20} color="#22C55E" className="mr-3" />
        <Text className="text-black text-base">Picked up</Text>
      </View>
      <Text className="text-gray-500 text-sm ml-8 mb-4">
        {ACTIVE_JOB.pickedUp}
      </Text>

      <View className="flex-row items-center mb-3">
        <MapPin size={20} color="#A1A1AA" className="mr-3" />
        <Text className="text-black text-base">Next</Text>
      </View>
      <Text className="text-gray-500 text-sm ml-8 mb-4">
        {ACTIVE_JOB.nextStop}
      </Text>

      {/* Action Buttons */}
      <View className="flex-row justify-between mt-4 mb-6">
        <TouchableOpacity className="items-center flex-1">
          <View className="w-14 h-14 bg-gray-100 rounded-full items-center justify-center mb-1">
            <Navigation size={24} color="#3B82F6" />
          </View>
          <Text className="text-gray-500 text-xs font-medium">Navigate</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center flex-1">
          <View className="w-14 h-14 bg-gray-100 rounded-full items-center justify-center mb-1">
            <Phone size={24} color="#22C55E" />
          </View>
          <Text className="text-gray-500 text-xs font-medium">Call</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center flex-1">
          <View className="w-14 h-14 bg-gray-100 rounded-full items-center justify-center mb-1">
            <MessageSquare size={24} color="#FBBF24" />
          </View>
          <Text className="text-gray-500 text-xs font-medium">Message</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Delivery Button */}
      <TouchableOpacity className="bg-[#4ADE80] py-4 rounded-full items-center shadow-lg shadow-green-200 active:bg-green-500">
        <Text className="text-white font-bold text-base uppercase tracking-wider">
          Confirm Delivery
        </Text>
      </TouchableOpacity>
    </View>

    {/* Completed Today Section */}
    <View className="mx-5 mt-6">
      <Text className="text-xl font-bold text-black mb-4">Completed Today</Text>
      {COMPLETED_TODAY.map((job) => (
        <View
          key={job.id}
          className="bg-white p-4 rounded-xl mb-3 flex-row justify-between items-center shadow-sm"
        >
          <View>
            <Text className="text-gray-500 text-sm">{job.id}</Text>
            <Text className="text-gray-400 text-xs mt-1">
              Completed at {job.time}: {job.from} → {job.to}
            </Text>
          </View>
          <Text className="text-black font-extrabold text-lg">
            {job.earning}
          </Text>
        </View>
      ))}
    </View>
  </ScrollView>
);

// --- MAIN SCREEN ---
const JobsScreen = () => {
  const [activeTab, setActiveTab] = useState<"Available" | "Active">(
    "Available"
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F6F8FA]">
      <StatusBar barStyle="dark-content" />

      {/* --- HEADER --- */}
      <View className="px-5 pt-2 pb-2">
        {/* Top Row: User Profile & Actions */}
        <View className="flex-row justify-between items-center mb-6">
          {/* Left: Avatar + Name */}
          <View className="flex-row items-center">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
              }}
              className="w-10 h-10 rounded-full bg-gray-200 mr-3"
            />
            <View>
              <Text className="text-gray-400 text-xs">Name Name</Text>
              <View className="flex-row items-center">
                <MapPin size={12} color="black" className="mr-1" />
                <Text className="text-black font-bold text-sm">Blida</Text>
              </View>
            </View>
          </View>

          {/* Right: Icons */}
          <View className="flex-row items-center gap-4">
            <TouchableOpacity>
              <Bell size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MessageCircle size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title Row */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-3xl font-extrabold text-black">Jobs</Text>
          <TouchableOpacity>
            <SlidersHorizontal size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* --- TABS --- */}
        <View className="flex-row bg-white rounded-full p-1 mb-2 shadow-sm border border-gray-100 mx-1">
          <TouchableOpacity
            onPress={() => setActiveTab("Available")}
            className={`flex-1 py-3 rounded-full items-center ${
              activeTab === "Available" ? "bg-[#FCD34D]" : "bg-transparent"
            }`}
          >
            <Text
              className={`font-bold ${
                activeTab === "Available" ? "text-black" : "text-gray-400"
              }`}
            >
              Available(12)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("Active")}
            className={`flex-1 py-3 rounded-full items-center ${
              activeTab === "Active" ? "bg-[#FCD34D]" : "bg-transparent"
            }`}
          >
            <Text
              className={`font-bold ${
                activeTab === "Active" ? "text-black" : "text-gray-400"
              }`}
            >
              Active(02)
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* --- CONDITIONAL CONTENT --- */}
      {activeTab === "Available" ? (
        <FlatList
          data={AVAILABLE_JOBS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AvailableJobCard item={item} />}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ActiveJobView />
      )}
    </SafeAreaView>
  );
};

export default JobsScreen;
