import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react-native";
import * as Progress from "react-native-progress";

// --- Reusable, Styled Form Field Component ---
const FormField = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
}) => (
  <View className="mb-8">
    <Text className="text-base text-gray-500 mb-2">{label}</Text>
    <TextInput
      className="border-b-2 border-gray-200 p-2 text-lg text-gray-800"
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

// --- NEW, FULL-WIDTH ROLE BUTTON ---
const RoleButton = ({ icon, label, isSelected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-row items-center p-4 border-2 rounded-2xl mb-4 ${isSelected ? "bg-green-50 border-green-600" : "bg-gray-50 border-gray-200"}`}
  >
    <Text className="text-4xl mr-4">{icon}</Text>
    <Text
      className={`text-lg font-bold ${isSelected ? "text-green-800" : "text-gray-800"}`}
    >
      {label}
    </Text>
    {isSelected && (
      <View className="ml-auto bg-green-600 p-1 rounded-full">
        <Check size={16} color="#fff" />
      </View>
    )}
  </TouchableOpacity>
);

// --- NEW, STYLED INFO ROW FOR FINAL CHECK ---
const InfoRow = ({ icon: Icon, label, value }) => (
  <View className="flex-row items-center bg-white p-3 rounded-xl mb-2 shadow-sm shadow-black/5 border border-gray-100">
    <Icon size={20} color="#4b5563" />
    <View className="ml-4">
      <Text className="text-xs text-gray-500">{label}</Text>
      <Text className="text-base font-semibold text-gray-800">{value}</Text>
    </View>
  </View>
);

export default function Register() {
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [role, setRole] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const [loading, setLoading] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const userData = {
        username,
        email,
        password,
        confirmPassword,
        phone,
        wilaya,
        role,
        referralCode,
      };
      await registerUser(userData);
    } catch (error) {
      console.error("Registration failed:", error);
      Alert.alert(
        "Registration Failed",
        "An error occurred. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text className="text-3xl font-extrabold text-gray-800 mb-2">
              Account Basics
            </Text>
            <Text className="text-base text-gray-500 mb-10">
              Let's get you set up.
            </Text>
            <FormField
              label="Your Name"
              value={username}
              onChangeText={setUsername}
              placeholder="John Doe"
            />
            <FormField
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
            />
            <FormField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
            />
            <FormField
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="••••••••"
              secureTextEntry
            />
          </View>
        );
      case 2:
        return (
          <View>
            <Text className="text-3xl font-extrabold text-gray-800 mb-2">
              Personal Details
            </Text>
            <Text className="text-base text-gray-500 mb-10">
              A little more about you.
            </Text>
            <FormField
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              placeholder="+213 XXX XX XX XX"
              keyboardType="phone-pad"
            />
            <FormField
              label="Wilaya (State/Province)"
              value={wilaya}
              onChangeText={setWilaya}
              placeholder="e.g., Algiers"
            />
            <FormField
              label="Referral Code (Optional)"
              value={referralCode}
              onChangeText={setReferralCode}
              placeholder="Enter code from a friend"
            />
          </View>
        );
      case 3:
        return (
          <View>
            <Text className="text-3xl font-extrabold text-gray-800 mb-2">
              What's Your Role?
            </Text>
            <Text className="text-base text-gray-500 mb-10">
              This helps us customize your experience.
            </Text>
            <View>
              <RoleButton
                icon="🛒"
                label="Buyer"
                isSelected={role === "buyer"}
                onPress={() => setRole("buyer")}
              />
              <RoleButton
                icon="🌾"
                label="Farmer"
                isSelected={role === "farmer"}
                onPress={() => setRole("farmer")}
              />
              <RoleButton
                icon="🚚"
                label="Delivery"
                isSelected={role === "delivery"}
                onPress={() => setRole("transporter")}
              />
            </View>
          </View>
        );
      case 4:
        const capitalizedRole = role
          ? role.charAt(0).toUpperCase() + role.slice(1)
          : "";
        return (
          <View>
            <Text className="text-3xl font-extrabold text-gray-800 mb-2">
              Final Check
            </Text>
            <Text className="text-base text-gray-500 mb-10">
              Does everything look correct?
            </Text>
            <View className="p-4 bg-gray-50 rounded-2xl space-y-2">
              <InfoRow icon={User} label="Full Name" value={username} />
              <InfoRow icon={Mail} label="Email Address" value={email} />
              <InfoRow icon={Phone} label="Phone Number" value={phone} />
              <InfoRow icon={MapPin} label="Wilaya" value={wilaya} />
              <InfoRow
                icon={Briefcase}
                label="Selected Role"
                value={capitalizedRole}
              />
              {referralCode ? (
                <InfoRow
                  icon={Check}
                  label="Referral Code"
                  value={referralCode}
                />
              ) : null}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView
          contentContainerStyle={{ padding: 24, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header and Progress Bar */}
          <View className="mb-8">
            <TouchableOpacity
              onPress={() => router.replace("/login")}
              className="mb-4"
            >
              <Text className="text-green-700 font-bold">← Back to Login</Text>
            </TouchableOpacity>
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-bold text-gray-400">
                STEP {step} OF {totalSteps}
              </Text>
            </View>
            <Progress.Bar
              progress={step / totalSteps}
              width={null}
              height={6}
              color={"#22c55e"}
              unfilledColor={"#e5e7eb"}
              borderWidth={0}
              className="mt-2"
            />
          </View>

          {/* Dynamic Step Content */}
          <View className="flex-1">{renderStep()}</View>

          {/* Navigation Buttons */}
          <View className="mt-10">
            {step > 1 && (
              <TouchableOpacity
                onPress={back}
                className="absolute bottom-6 left-0"
              >
                <View className="flex-row items-center">
                  <ArrowLeft size={20} color="#6b7280" />
                  <Text className="text-gray-500 font-bold text-base ml-1">
                    Back
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {step < totalSteps && (
              <View className="items-end">
                <TouchableOpacity
                  onPress={next}
                  className="bg-green-700 w-16 h-16 rounded-full items-center justify-center"
                >
                  <ArrowRight size={32} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
            {step === totalSteps && (
              <TouchableOpacity
                onPress={handleRegister}
                disabled={loading}
                className={`flex-row items-center justify-center p-4 rounded-full ${loading ? "bg-green-400" : "bg-green-700"}`}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text className="text-white text-lg font-bold mr-2">
                      Create Account
                    </Text>
                    <Check size={22} color="#fff" />
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
