import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";

export default function Register() {
  const [step, setStep] = useState(1);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [role, setRole] = useState("");

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  return (
    <ScrollView className="flex-1 bg-white p-6">
      {/* Step Indicator */}
      <Text className="text-gray-500 mb-3">Step {step} of 4</Text>
      <View className="w-full h-2 bg-gray-200 rounded-full mb-6">
        <View
          className="h-2 bg-blue-500 rounded-full"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </View>

      {/* STEP 1 — Basic Info */}
      {step === 1 && (
        <View className="space-y-4">
          <Text className="text-2xl font-bold">Create your account</Text>

          <TextInput
            placeholder="Full name"
            value={name}
            onChangeText={setName}
            className="border p-3 rounded-xl"
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="border p-3 rounded-xl"
          />

          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            className="border p-3 rounded-xl"
          />

          <TouchableOpacity
            onPress={next}
            className="bg-blue-500 p-4 rounded-xl"
          >
            <Text className="text-center text-white font-semibold">Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 2 — Personal Details */}
      {step === 2 && (
        <View className="space-y-4">
          <Text className="text-2xl font-bold">Personal details</Text>

          <TextInput
            placeholder="Phone number"
            value={phone}
            onChangeText={setPhone}
            className="border p-3 rounded-xl"
          />

          <TextInput
            placeholder="Location / City"
            value={location}
            onChangeText={setLocation}
            className="border p-3 rounded-xl"
          />

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity onPress={back} className="p-4">
              <Text>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={next}
              className="bg-blue-500 p-4 rounded-xl"
            >
              <Text className="text-white">Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 3 — Role Selection */}
      {step === 3 && (
        <View className="space-y-4">
          <Text className="text-2xl font-bold mb-2">Choose your role</Text>

          {[
            { id: "buyer", label: "Buyer", emoji: "🛒" },
            { id: "seller", label: "Seller", emoji: "🏪" },
            { id: "farmer", label: "Farmer", emoji: "🌾" },
            { id: "delivery", label: "Delivery", emoji: "🚚" },
          ].map((r) => (
            <TouchableOpacity
              key={r.id}
              onPress={() => setRole(r.id)}
              className={`p-4 border rounded-xl flex-row items-center justify-between ${
                role === r.id ? "border-blue-500 bg-blue-50" : ""
              }`}
            >
              <Text className="text-xl">{r.emoji} {r.label}</Text>
              {role === r.id && (
                <Text className="text-blue-500 font-semibold">Selected</Text>
              )}
            </TouchableOpacity>
          ))}

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity onPress={back} className="p-4">
              <Text>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!role}
              onPress={next}
              className={`p-4 rounded-xl ${
                role ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <Text className="text-white">Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 4 — Final Review */}
      {step === 4 && (
        <View className="space-y-4">
          <Text className="text-2xl font-bold mb-2">Review your information</Text>

          <View className="p-4 border rounded-xl space-y-2">
            <Text>Name: {name}</Text>
            <Text>Email: {email}</Text>
            <Text>Phone: {phone}</Text>
            <Text>Location: {location}</Text>
            <Text>Role: {role}</Text>
          </View>

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity onPress={back} className="p-4">
              <Text>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                alert("Submitted! (Connect backend later)");
                router.replace("/(auth)/login");
              }}
              className="bg-green-600 p-4 rounded-xl"
            >
              <Text className="text-white font-semibold">Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
