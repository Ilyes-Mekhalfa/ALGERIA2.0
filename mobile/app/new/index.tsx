import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ChevronDown, UploadCloud } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Reusable Form Field Component ---
const FormField = ({ label, placeholder, value, onChangeText, keyboardType = 'default', multiline = false, unit }) => (
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
      {unit && <Text className="p-4 text-base text-gray-500 font-semibold">{unit}</Text>}
    </View>
  </View>
);

// --- Main Add Product Screen Component ---
const AddProductScreen = () => {
  const [images, setImages] = useState([]);

  // --- Image Picker Logic ---
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages(prevImages => [...prevImages, ...result.assets]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* --- Header --- */}
      <View className="p-4 border-b border-gray-200">
        <Text className="text-3xl font-bold text-gray-800 text-center">Add New Product</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {/* --- Product Info Section --- */}
        <FormField label="Product Name" placeholder="e.g., Roma Tomatoes, Grade A" />
        <FormField label="Category" placeholder="Select a category" unit={<ChevronDown color="#6b7280" size={20} />} />

        {/* --- Inventory & Pricing Section --- */}
        <View className="flex-row justify-between">
          <View className="w-[48%]">
            <FormField label="Quantity" placeholder="10" keyboardType="numeric" />
          </View>
          <View className="w-[48%]">
            <FormField label="Unit" placeholder="Tons" unit={<ChevronDown color="#6b7280" size={20} />} />
          </View>
        </View>
        <FormField label="Price per Unit" placeholder="55,000" keyboardType="numeric" unit="DZD" />

        {/* --- Image Uploader Section --- */}
        <View className="mb-6">
          <Text className="text-base font-bold text-gray-800 mb-2">Product Photos</Text>
          <TouchableOpacity onPress={pickImage} className="border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 items-center justify-center py-10">
            <UploadCloud color="#6b7280" size={40} />
            <Text className="text-base text-gray-600 mt-2">Tap to upload photos</Text>
            <Text className="text-sm text-gray-400">(Up to 5 photos)</Text>
          </TouchableOpacity>
        </View>
        
        {/* --- Display Selected Images --- */}
        {images.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.uri }}
                className="w-24 h-24 rounded-lg mr-2 border border-gray-200"
              />
            ))}
          </ScrollView>
        )}

        {/* --- Description Section --- */}
        <FormField 
          label="Description (Optional)" 
          placeholder="Add details about the product quality, origin, or certifications..."
          multiline={true}
        />
        
      </ScrollView>

      {/* --- Footer with Action Buttons --- */}
      <View className="flex-row justify-between p-4 bg-white border-t border-gray-200">
        <TouchableOpacity className="w-[48%] bg-gray-200 py-4 rounded-2xl items-center">
            <Text className="text-base font-bold text-gray-800">Save as Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-[48%] bg-green-700 py-4 rounded-2xl items-center">
            <Text className="text-base font-bold text-white">Publish Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddProductScreen;
