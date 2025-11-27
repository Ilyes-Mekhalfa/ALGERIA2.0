import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Redirect, router } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";

export default function LoginScreen() {
  const { user, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  // If already logged in → go to tabs
  if (user) return <Redirect href="/(tabs)" />;

  function fakeLogin() {
    setError("");

    // Fake validation
    if (email.trim() === "" || password.trim() === "") {
      setError("Please fill all fields");
      return;
    }

    // You can customize this temporary logic
    if (email !== "test@example.com" || password !== "123456") {
      setError("Wrong email or password (static check)");
      return;
    }

    // Fake user object
    const fakeUser = {
      id: "123",
      name: "John Doe",
      email: email,
    };

    // Save to auth context
    setUser(fakeUser);
  }

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-8 text-center">
        Login
      </Text>

      {error ? (
        <Text className="text-red-500 text-center mb-4">{error}</Text>
      ) : null}

      <TextInput
        className="border border-gray-300 p-3 rounded-xl mb-4"
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="border border-gray-300 p-3 rounded-xl mb-4"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="bg-blue-600 p-4 rounded-xl mt-2"
        onPress={fakeLogin}
      >
        <Text className="text-white text-center font-semibold">
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-4"
        onPress={() => {
          // This will be replaced with navigation later
          router.replace("register")
        }}
      >
        <Text className="text-center text-blue-600">
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}
