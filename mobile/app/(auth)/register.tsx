// In your Register.js file

import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Linking } from "react-native";
import { useAuth } from "@/providers/AuthProvider"; // <-- IMPORTANT: Import useAuth

export default function Register() {
  const  {register : RegisterUser }  = useAuth(); 

  const [step, setStep] = useState(1);
  // Form fields (no changes here)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  // --- THIS IS THE NEW SUBMIT HANDLER ---
  const handleRegister = async () => {
    try {
      // Create an object with all the user's data
      const userData = { username, email, password, confirmPassword, phone, location, role };
      if (referralCode) userData.referralCode = referralCode;
      // Call the register function from our context
      await RegisterUser(userData);
      // Navigation will be handled by the context upon success
    } catch (error) {
      // If the API call fails, show an alert
      console.error("Registration failed:", error);
      Alert.alert("Registration Failed", "An error occurred. Please check your details and try again.");
    }
  };

  // Listen for deep links with a referral code, e.g. myapp://register?referral=abc123
  useEffect(() => {
    const extractReferral = async (url) => {
      try {
        if (!url) return;
        const parsed = new URL(url);
        const ref = parsed.searchParams.get('referral') || parsed.searchParams.get('referralCode') || parsed.searchParams.get('ref');
        if (ref) setReferralCode(ref);
      } catch (e) {
        // ignore malformed urls
      }
    };

    // initial URL when app opens
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      await extractReferral(initialUrl);
    })();

    const onLink = ({ url }) => extractReferral(url);
    const subscription = Linking.addEventListener('url', onLink);
    return () => {
      try { subscription.remove(); } catch (e) { /* RN <0.65 compat */ Linking.removeEventListener('url', onLink); }
    };
  }, []);

  return (
    <ScrollView className="flex-1 bg-white p-6">
      {/* Step Indicator (no changes) */}
      <Text className="text-gray-500 mb-3">Step {step} of 4</Text>
      <View className="w-full h-2 bg-gray-200 rounded-full mb-6">
        <View
          className="h-2 bg-blue-500 rounded-full"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </View>

      {/* --- ALL STEPS 1, 2, and 3 are exactly the same. --- */}
      {/* STEP 1 — Basic Info */}
      {step === 1 && (
        <View className="space-y-4">
          <Text className="text-2xl font-bold">Create your account</Text>
          <TextInput placeholder="Full name" value={username} onChangeText={setUsername} className="border p-3 rounded-xl"/>
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} className="border p-3 rounded-xl"/>
          <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} className="border p-3 rounded-xl"/>
          <TextInput placeholder="Confirm Password" value={confirmPassword} secureTextEntry onChangeText={setConfirmPassword} className="border p-3 rounded-xl"/>
          <TouchableOpacity onPress={next} className="bg-blue-500 p-4 rounded-xl">
            <Text className="text-center text-white font-semibold">Next</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* STEP 2 — Personal Details */}
      {step === 2 && (
        <View className="space-y-4">
          <Text className="text-2xl font-bold">Personal details</Text>
          <TextInput placeholder="Phone number" value={phone} onChangeText={setPhone} className="border p-3 rounded-xl"/>
          <TextInput placeholder="Location / City" value={location} onChangeText={setLocation} className="border p-3 rounded-xl"/>
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity onPress={back} className="p-4"><Text>Back</Text></TouchableOpacity>
            <TouchableOpacity onPress={next} className="bg-blue-500 p-4 rounded-xl"><Text className="text-white">Next</Text></TouchableOpacity>
          </View>
        </View>
      )}
      {/* STEP 3 — Role Selection */}
      {step === 3 && (
        <View className="space-y-4">
          <Text className="text-2xl font-bold mb-2">Choose your role</Text>
          {[{ id: "buyer", label: "Buyer", emoji: "🛒" }, { id: "seller", label: "Seller", emoji: "🏪" }, { id: "farmer", label: "Farmer", emoji: "🌾" }, { id: "delivery", label: "Delivery", emoji: "🚚" }].map((r) => (
            <TouchableOpacity key={r.id} onPress={() => setRole(r.id)} className={`p-4 border rounded-xl flex-row items-center justify-between ${role === r.id ? "border-blue-500 bg-blue-50" : ""}`}>
              <Text className="text-xl">{r.emoji} {r.label}</Text>
              {role === r.id && <Text className="text-blue-500 font-semibold">Selected</Text>}
            </TouchableOpacity>
          ))}
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity onPress={back} className="p-4"><Text>Back</Text></TouchableOpacity>
            <TouchableOpacity disabled={!role} onPress={next} className={`p-4 rounded-xl ${role ? "bg-blue-500" : "bg-gray-300"}`}>
              <Text className="text-white">Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* --- THIS IS THE UPDATED FINAL STEP --- */}
      {step === 4 && (
        <View className="space-y-4">
          <Text className="text-2xl font-bold mb-2">Review your information</Text>
          <View className="p-4 border rounded-xl space-y-2 bg-gray-50">
            <Text><Text className="font-bold">Name:</Text> {username}</Text>
            <Text><Text className="font-bold">Email:</Text> {email}</Text>
            <Text><Text className="font-bold">Phone:</Text> {phone}</Text>
            <Text><Text className="font-bold">Location:</Text> {location}</Text>
            <Text><Text className="font-bold">Role:</Text> {role}</Text>
              {referralCode ? <Text><Text className="font-bold">Referral:</Text> {referralCode}</Text> : null}
          </View>
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity onPress={back} className="p-4">
              <Text>Back</Text>
            </TouchableOpacity>
            {/* This button now calls our handleRegister function */}
            <TouchableOpacity
              onPress={handleRegister}
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
