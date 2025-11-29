import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { ArrowLeft, Bell, Camera, MapPin, LogOut } from "lucide-react-native";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F2FBF6]">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* ---------------- HEADER ---------------- */}
      {/* Removed 'z-10' so it doesn't cover the image */}
      <View className="bg-green-500 pb-36 pt-16 px-6 rounded-b-[40px] shadow-sm">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={28} color="white" />
          </TouchableOpacity>

          <Text className="text-white text-xl font-bold">Profile</Text>

          <TouchableOpacity>
            <Bell size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          flexGrow: 1,
          paddingBottom: 40,
        }}
        // Important: allows content to overflow visibly for the negative margin
        style={{ overflow: "visible" }}
      >
        {/* Avatar Section */}
        {/* z-50 ensures this specific view sits ON TOP of the green header */}
        <View className="items-center -mt-16 mb-6 z-50">
          <View className="relative">
            {/* White border wrapper */}
            <View className="bg-white p-1.5 rounded-full shadow-sm elevation-5">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=400&h=400",
                }}
                className="w-32 h-32 rounded-full"
              />
            </View>

            {/* Camera Icon */}
            <TouchableOpacity
              className="absolute bottom-1 right-1 bg-green-500 p-2.5 rounded-full border-[3px] border-white shadow-sm"
              activeOpacity={0.8}
            >
              <Camera size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Info */}
        <View className="items-center mb-8">
          <Text className="text-xl font-extrabold text-black mb-1">
            Farmer name
          </Text>

          <View className="flex-row items-center">
            <MapPin size={16} color="#374151" />
            <Text className="ml-1 text-gray-600 font-medium text-sm">
              Blida
            </Text>
          </View>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity
          className="bg-green-500 w-48 py-3.5 rounded-full self-center shadow-sm elevation-4"
          activeOpacity={0.85}
        >
          <Text className="text-white text-center font-bold text-base">
            Edit Profile
          </Text>
        </TouchableOpacity>

        {/* LOGOUT BUTTON */}
        <View className="mt-auto pt-10">
          <TouchableOpacity
            className="bg-[#DC2626] flex-row items-center justify-center py-4 rounded-full shadow-sm elevation-3 mb-40"
            activeOpacity={0.85}
          >
            <LogOut size={20} color="white" />
            <Text className="text-white font-bold text-lg ml-2">Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
