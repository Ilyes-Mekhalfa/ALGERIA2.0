import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../providers/AuthProvider"; // Adjust this path if necessary
import { UserCircle, Mail, LogOut, Shield } from "lucide-react-native";

// --- Reusable Component for Information Rows ---
const InfoRow = ({ icon: Icon, label, value }) => (
  <View className="flex-row items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
    <View className="bg-gray-100 p-3 rounded-full mr-4">
      <Icon size={24} color="#4b5563" />
    </View>
    <View>
      <Text className="text-sm text-gray-500">{label}</Text>
      <Text className="text-base font-bold text-gray-800">{value}</Text>
    </View>
  </View>
);

// --- Main Profile Screen Component ---
const Profile = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  // Helper to capitalize the first letter (e.g., 'farmer' -> 'Farmer')
  const capitalize = (s) =>
    s && s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : "";

  // Show a loading indicator while the user data is being fetched on app start
  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#166534" />
      </SafeAreaView>
    );
  }

  // Handle the case where the user is not logged in
  if (!user) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center p-6">
        <Text className="text-lg text-gray-600 mb-4">
          You are not logged in.
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/login")}
          className="bg-green-700 px-8 py-3 rounded-full"
        >
          <Text className="text-white font-bold">Go to Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 20 }}
      >
        {/* --- User Avatar Card --- */}
        <View className="items-center bg-white p-8 rounded-2xl shadow-md shadow-black/5 mb-8">
          <UserCircle size={80} color="#4b5563" strokeWidth={1.5} />
          <Text className="text-2xl font-bold text-gray-900 mt-4">
            {user.username || "User"}
          </Text>
          <Text className="text-base text-gray-500 mt-1">
            {user.email || "No email provided"}
          </Text>
        </View>

        {/* --- User Details Section --- */}
        <View className="space-y-4">
          <InfoRow icon={Mail} label="Email Address" value={user.email} />
          <InfoRow
            icon={Shield}
            label="Account Role"
            value={capitalize(user.role)}
          />
          {/* You can add more InfoRow components here for other user data */}
        </View>

        {/* --- Logout Button --- */}
        <TouchableOpacity
          onPress={logout}
          className="flex-row items-center justify-center bg-red-50 p-4 rounded-2xl mt-10 border border-red-200"
        >
          <LogOut size={20} color="#b91c1c" />
          <Text className="text-red-700 text-base font-bold ml-3">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
