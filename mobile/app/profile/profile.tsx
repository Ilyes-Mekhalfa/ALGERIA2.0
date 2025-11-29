import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator, // Import for loading state
} from "react-native";
import { ArrowLeft, Bell, Camera, MapPin, LogOut } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../providers/AuthProvider"; // <-- 1. IMPORT useAuth

const ProfileScreen = () => {
  const router = useRouter();
  // --- 2. GET USER, LOGOUT, AND LOADING STATE FROM CONTEXT ---
  const { user, logout, loading } = useAuth();
  // ---------------------------------------------------------

  // --- Show a loading spinner if user data is not yet available ---
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F2FBF6]">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  // --- Show a message if the user is not logged in ---
  if (!user) {
    return (
      <View className="flex-1 justify-center items-center p-6 bg-[#F2FBF6]">
        <Text className="text-lg text-gray-600 mb-4">You are not logged in.</Text>
        <TouchableOpacity
          onPress={() => router.replace('/login')}
          className="bg-green-500 px-8 py-3 rounded-full"
        >
          <Text className="text-white font-bold">Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#F2FBF6]">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      
      {/* HEADER (No changes needed) */}
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
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          flexGrow: 1,
          paddingBottom: 40,
        }}
        style={{ overflow: "visible" }}
      >
        {/* Avatar Section */}
        <View className="items-center -mt-16 mb-6 z-50">
          <View className="relative">
            <View className="bg-white p-1.5 rounded-full shadow-sm elevation-5">
              {/* --- 3. USE USER'S IMAGE IF AVAILABLE --- */}
              <Image
                source={{
                  uri: user.imageUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=400&h=400",
                }}
                className="w-32 h-32 rounded-full"
              />
            </View>
            <TouchableOpacity
              className="absolute bottom-1 right-1 bg-green-500 p-2.5 rounded-full border-[3px] border-white shadow-sm"
              activeOpacity={0.8}
            >
              <Camera size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- 4. DISPLAY REAL USER INFO --- */}
        <View className="items-center mb-8">
          <Text className="text-2xl font-extrabold text-black mb-1">
            {user.username || "User"}
          </Text>
          <View className="flex-row items-center">
            <MapPin size={16} color="#374151" />
            <Text className="ml-1 text-gray-600 font-medium text-sm">
              {user.location || "Location not set"}
            </Text>
          </View>
        </View>
        {/* ------------------------------- */}

        {/* Edit Profile Button (No changes needed) */}
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
          {/* --- 5. ADD onPress HANDLER TO LOGOUT --- */}
          <TouchableOpacity
            className="bg-[#DC2626] flex-row items-center justify-center py-4 rounded-full shadow-sm elevation-3"
            activeOpacity={0.85}
            onPress={logout} // <-- The magic happens here!
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
