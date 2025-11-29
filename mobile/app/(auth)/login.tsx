import { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert, 
  ImageBackground, // For the background image
  ScrollView 
} from "react-native";
import { Redirect, router } from "expo-router";
import { useAuth } from "../../providers/AuthProvider"; // Make sure this path is correct
import { SafeAreaView } from "react-native-safe-area-context";
import { Leaf, Mail, Lock } from 'lucide-react-native'; // Icons for the form

// --- A new, reusable FormField component styled like the design ---
const FormField = ({ icon: Icon, value, onChangeText, placeholder, keyboardType = 'default', secureTextEntry = false }) => (
  <View className="flex-row items-center border-b-2 border-gray-200/50 p-2 mb-6">
    <Icon size={20} color="#fff" />
    <TextInput
      className="flex-1 ml-4 text-lg text-white"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#d1d5db"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  </View>
);

export default function LoginScreen() {
  const { user, login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    return <Redirect href="/(farmer)" />;
  }

  // The login logic remains the same
  async function handleLogin() {
    setError("");
    if (email.trim() === "" || password.trim() === "") {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1492944547225-a1c141507fb3?w=800' }}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 bg-black/50">
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View className="p-8">
            
            {/* Logo and Welcome Text */}
            <View className="items-center mb-10">
              <Leaf size={60} color="#22c55e" />
              <Text className="text-4xl font-extrabold text-white mt-4">Welcome Back</Text>
              <Text className="text-lg text-gray-300 mt-1">Login to your account</Text>
            </View>

            {/* Error Message */}
            {error ? (
              <Text className="text-red-400 text-center mb-4 bg-red-900/50 p-2 rounded-lg">{error}</Text>
            ) : null}
            
            {/* Form Fields */}
            <FormField
              icon={Mail}
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
            />
            <FormField
              icon={Lock}
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
            />

            {/* Forgot Password Link */}
            <TouchableOpacity className="self-end mb-6">
              <Text className="text-gray-300 font-semibold">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              className="bg-green-600 p-4 rounded-xl flex-row justify-center shadow-lg shadow-green-900/40"
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center font-bold text-lg">Login</Text>
              )}
            </TouchableOpacity>

            {/* Register Link */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-300">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.replace("/register")}>
                <Text className="text-green-400 font-bold">Register</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
