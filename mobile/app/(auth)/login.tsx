import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Redirect, router } from "expo-router";
import { useAuth } from "../../providers/AuthProvider"; // Make sure this path is correct

export default function LoginScreen() {
  // 1. Get the REAL login function and user state from the context
  const { user, login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // State to handle loading feedback
  const [loading, setLoading] = useState(false);

  // If the user object exists, they are already logged in. Redirect them.
  if (user) {
    // Redirect based on your main tab group name, e.g., "/(farmer)"
    return <Redirect href="/(farmer)" />; 
  }

  // --- This is the new, real login function ---
  async function handleLogin() {
    setError(""); // Clear previous errors

    // Basic client-side validation
    if (email.trim() === "" || password.trim() === "") {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true); // Start loading indicator

    try {
      // Call the login function from your AuthProvider
      await login(email, password);
      // On success, the AuthProvider will handle the redirect automatically
    } catch (err) {
      // If the API call fails, handle the error
      console.error("Login failed:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      // Stop loading indicator whether it succeeded or failed
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-8 text-center">
        Welcome Back
      </Text>

      {/* Display API or validation errors */}
      {error ? (
        <Text className="text-red-500 text-center mb-4">{error}</Text>
      ) : null}

      <TextInput
        className="border border-gray-300 p-4 rounded-xl mb-4 text-base"
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="border border-gray-300 p-4 rounded-xl mb-4 text-base"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* The login button now calls handleLogin */}
      <TouchableOpacity
        className="bg-blue-600 p-4 rounded-xl mt-2 flex-row justify-center"
        onPress={handleLogin}
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center font-semibold text-base">
            Login
          </Text>
        )}
      </TouchableOpacity>

      {/* Link to the registration page */}
      <TouchableOpacity
        className="mt-5"
        onPress={() => router.replace("/register")} // Use your register route name
        disabled={loading}
      >
        <Text className="text-center text-blue-600">
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}
