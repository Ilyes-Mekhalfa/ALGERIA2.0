import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ChevronDown, UploadCloud, ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import productService from "../../services/productServices"; // Adjust the import path
import { useAuth } from "@/providers/AuthProvider";

// --- Reusable Form Field Component (No changes needed) ---
const FormField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  multiline = false,
  unit,
}) => (
  <View className="mb-6">
    <Text className="text-base font-bold text-gray-800 mb-2">{label}</Text>
    <View className="flex-row items-center bg-white border border-gray-300 rounded-2xl">
      <TextInput
        className="flex-1 p-4 text-base"
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
      {unit && (
        <Text className="p-4 text-base text-gray-500 font-semibold">
          {unit}
        </Text>
      )}
    </View>
  </View>
);

// --- Main Add Product Screen Component ---
const AddProductScreen = () => {
  const router = useRouter();

  const { user } = useAuth();

  // State for all form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [unit, setUnit] = useState(""); // Field for stock unit (kg, ton, etc.)
  const [quality, setQuality] = useState(""); // <-- 1. ADD STATE FOR QUALITY
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Image Picker Logic (No changes)
  const pickImage = async () => {
    /* ... */
  };

  // --- Submission Handler ---
  const handlePublish = async () => {
    // Updated validation to include new fields
    if (!name || !stock || !price || !unit || !quality) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }

    setLoading(true);
    console.log(user);
    // --- 2. ADD 'unit' AND 'quality' TO THE PAYLOAD ---
    const productData = {
      userId: user.id,
      name: name,
      description: description,
      price: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 0,
      unit: unit,
      quality: quality,
    };
    // --------------------------------------------------

    console.log("Sending data to backend:", productData);

    try {
      await productService.createProduct(productData);

      Alert.alert("Success!", "Your product has been published.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Failed to create product:", error);
      if (error.response) {
        console.error("Backend Error Response:", error.response.data);
      }
      Alert.alert("Error", "There was a problem publishing your product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }} className="bg-white">
      {/* Header with back button */}
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => router.replace("/(farmer)")}
          className="p-2"
        >
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Add New Product</Text>
        <View className="w-10" />
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <FormField
          label="Product Name"
          placeholder="e.g., Fresh Potato"
          value={name}
          onChangeText={setName}
        />

        {/* --- 3. ADD UI FOR THE NEW FIELDS --- */}
        <View className="flex-row justify-between">
          <View className="w-[48%]">
            <FormField
              label="Stock"
              placeholder="100"
              keyboardType="numeric"
              value={stock}
              onChangeText={setStock}
            />
          </View>
          <View className="w-[48%]">
            <FormField
              label="Unit"
              placeholder="kg, Ton, etc."
              value={unit}
              onChangeText={setUnit}
            />
          </View>
        </View>

        <View className="flex-row justify-between">
          <View className="w-[48%]">
            <FormField
              label="Price per Unit"
              placeholder="100"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
              unit="DZD"
            />
          </View>
          <View className="w-[48%]">
            <FormField
              label="Quality"
              placeholder="A, B, Grade 1..."
              value={quality}
              onChangeText={setQuality}
            />
          </View>
        </View>
        {/* ------------------------------------- */}

        <FormField
          label="Description"
          placeholder="e.g., Freshly harvested, ready for delivery."
          multiline={true}
          value={description}
          onChangeText={setDescription}
        />

        {/* Image Uploader Section (No changes) */}
        <View className="mb-6">{/* ... */}</View>

        {images.length > 0 && <ScrollView horizontal>{/* ... */}</ScrollView>}
      </ScrollView>

      {/* Footer with Action Buttons (No changes) */}
      <View className="flex-row justify-between p-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          onPress={() => router.replace("/(farmer)")}
          className="w-[48%] bg-gray-200 py-4 rounded-2xl items-center"
        >
          <Text className="text-base font-bold text-gray-800">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`w-[48%] py-4 rounded-2xl items-center flex-row justify-center ${loading ? "bg-green-400" : "bg-green-700"}`}
          onPress={handlePublish}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-base font-bold text-white">Publish Now</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddProductScreen;
