import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ChevronDown, UploadCloud } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import productService from '../../services/productServices'; // Adjust the import path

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
  const router = useRouter();

  // State for all form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(''); // Changed from 'quantity' to 'stock' to match backend
  const [category, setCategory] = useState(''); // Optional field
  const [unit, setUnit] = useState(''); // Optional field
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);


  // Image Picker Logic
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

  // --- Submission Handler ---
  const handlePublish = async () => {
    // Validation remains the same
    if (!name || !stock || !price) {
      Alert.alert("Missing Fields", "Please fill in product name, stock, and price.");
      return;
    }

    setLoading(true);

    // --- THIS IS THE FINAL, ROBUST FIX ---
    // We use the logical OR (||) operator as a fallback.
    // If parseFloat(price) results in NaN (which is "falsy"), it will default to 0.
    const productData = {
      name: name,
      description: description,
      price: parseFloat(price) || 0, // <-- FIX: Defaults to 0 if input is empty/invalid
      stock: parseInt(stock, 10) || 0,   // <-- FIX: Defaults to 0 if input is empty/invalid
    };
    // ------------------------------------

    console.log("Sending ROBUST data to backend:", productData); // This will now always show valid numbers

    try {
      await productService.createProduct(productData);

      Alert.alert("Success!", "Your product has been published.", [
        { text: "OK", onPress: () => router.back() }
      ]);
      
    } catch (error) {
      console.error("Failed to create product:", error);
      // It's helpful to log the server's response if it exists
      if (error.response) {
        console.error("Backend Error Response:", error.response.data);
      }
      Alert.alert("Error", "There was a problem publishing your product. The server rejected the data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }} className="bg-white">
      {/* Header */}
      <View className="p-4 border-b border-gray-200">
        <Text className="text-3xl font-bold text-gray-800 text-center">Add New Product</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <FormField label="Product Name" placeholder="e.g., Fresh Potato" value={name} onChangeText={setName} />
        
        {/* --- Using 'stock' for the state variable --- */}
        <View className="flex-row justify-between">
          <View className="w-[48%]">
            <FormField label="Stock" placeholder="100" keyboardType="numeric" value={stock} onChangeText={setStock} />
          </View>
          <View className="w-[48%]">
            <FormField label="Unit (Optional)" placeholder="kg, Tons, etc." value={unit} onChangeText={setUnit} />
          </View>
        </View>

        <FormField label="Price per Unit" placeholder="100" keyboardType="numeric" value={price} onChangeText={setPrice} unit="DZD" />
        <FormField 
          label="Description" 
          placeholder="e.g., Freshly harvested, ready for delivery."
          multiline={true} 
          value={description} 
          onChangeText={setDescription}
        />

        {/* Image Uploader Section */}
        <View className="mb-6">
          <Text className="text-base font-bold text-gray-800 mb-2">Product Photos</Text>
          <TouchableOpacity onPress={pickImage} className="border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 items-center justify-center py-10">
            <UploadCloud color="#6b7280" size={40} />
            <Text className="text-base text-gray-600 mt-2">Tap to upload photos</Text>
          </TouchableOpacity>
        </View>
        
        {images.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            {images.map((image, index) => (
              <Image key={index} source={{ uri: image.uri }} className="w-24 h-24 rounded-lg mr-2 border border-gray-200" />
            ))}
          </ScrollView>
        )}
      </ScrollView>

      {/* Footer with Action Buttons */}
      <View className="flex-row justify-between p-4 bg-white border-t border-gray-200">
        <TouchableOpacity onPress={() => router.replace('/(farmer)')} className="w-[48%] bg-gray-200 py-4 rounded-2xl items-center">
          <Text className="text-base font-bold text-gray-800">Save as Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`w-[48%] py-4 rounded-2xl items-center flex-row justify-center ${loading ? 'bg-green-400' : 'bg-green-700'}`}
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
