import React, { useState, useEffect, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert, 
  TextInput,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Plus, Minus } from 'lucide-react-native';

// --- Import your services and hooks ---
import productService from '../../services/productServices'; // Adjust this path
import orderService from '../../services/orderServices'; // Adjust this path
import { useAuth } from '../../providers/AuthProvider'; // Adjust this path

const FALLBACK_IMAGE_URL = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500';

const BuyProductScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { user } = useAuth(); // Get the currently logged-in user

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState('1');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false); // Loading state for the purchase button

    // Fetch product data when the component mounts
    useEffect(() => {
        if (!id) {
            Alert.alert("Error", "Product ID is missing.", [{ text: "OK", onPress: () => router.back() }]);
            return;
        }
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await productService.getProductById(id);
                if (response && response.data) {
                    setProduct(response.data);
                } else {
                    throw new Error("Product data not found in response");
                }
            } catch (error) {
                console.error("Failed to fetch product details:", error);
                Alert.alert("Error", "Could not load product details.", [{ text: "OK", onPress: () => router.back() }]);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // Calculate total price
    const totalPrice = useMemo(() => {
        const numQuantity = parseInt(quantity, 10) || 0;
        const numPrice = product?.price || 0;
        return numQuantity * numPrice;
    }, [quantity, product]);

    // Handle quantity changes with validation
    const handleQuantityChange = (newQty) => {
        const numQty = parseInt(newQty);
        if (isNaN(numQty)) {
            setQuantity(newQty === "" ? "" : "1");
            return;
        }
        if (numQty < 1) {
            setQuantity('1');
        } else if (product && numQty > product.stock) {
            setQuantity(product.stock.toString());
            Alert.alert("Stock Limit", `You cannot order more than the ${product.stock} available.`);
        } else {
            setQuantity(newQty.toString());
        }
    };
    
    // Finalize quantity input on blur
    const finalizeQuantity = () => {
        if (quantity === "" || parseInt(quantity, 10) < 1) {
            setQuantity('1');
        }
    };

    // --- Handle the final purchase action ---
    const handlePurchase = async () => {
      if (!user) {
        Alert.alert("Authentication Error", "You must be logged in to make a purchase.");
        return;
      }
      if (!product || !product.userId?._id) {
        Alert.alert("Error", "Product data is incomplete. Cannot place order.");
        return;
      }

      setIsPlacingOrder(true);

      const orderData = {
        seller: product.userId._id,
        buyer: user.id,
        products: [
          {
            productId: product._id,
            name: product.name,
            quantity: parseInt(quantity, 10) || 1,
            unit: product.unit,
            price: product.price,
          },
        ],
      };

      try {
        await orderService.createOrder(orderData);
        Alert.alert(
          "Success!", 
          "Your order has been placed successfully.",
          // Navigate to the user's orders page on success
          [{ text: "View My Orders", onPress: () => router.push('/(supplier)/orders') }] 
        );
      } catch (error) {
        console.error("Failed to create order:", error);
        Alert.alert("Error", "There was a problem placing your order. Please try again.");
      } finally {
        setIsPlacingOrder(false);
      }
    };

    // Main loading state
    if (loading || !product) {
        return (
            <SafeAreaView className="flex-1 justify-center bg-white">
                <ActivityIndicator size="large" color="#166534" />
            </SafeAreaView>
        );
    }

    const imageUrl = product.imageUrl || FALLBACK_IMAGE_URL;

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
            <StatusBar barStyle="dark-content" />
            
            {/* Header */}
            <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <ArrowLeft size={24} color="#1f2937" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-800 ml-4">Place Your Order</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
                {/* Product Summary Card */}
                <View className="flex-row bg-white p-4 m-4 rounded-2xl shadow-sm shadow-black/5">
                    <Image source={{ uri: imageUrl }} className="w-24 h-24 rounded-lg" />
                    <View className="flex-1 ml-4 justify-center">
                        <Text className="text-lg font-bold text-gray-900">{product.name}</Text>
                        <Text className="text-sm text-gray-500">
                            from {product.userId?.username || 'Anonymous Farmer'}
                        </Text>
                    </View>
                </View>

                {/* Quantity Selection */}
                <View className="p-4 m-4 bg-white rounded-2xl shadow-sm shadow-black/5">
                    <Text className="text-lg font-bold text-gray-800 mb-4">Choose Quantity</Text>
                    <View className="flex-row items-center justify-between bg-gray-100 p-2 rounded-xl">
                        <TouchableOpacity 
                            onPress={() => handleQuantityChange((parseInt(quantity, 10) || 1) - 1)}
                            className="bg-gray-200 w-14 h-14 rounded-lg items-center justify-center"
                        >
                            <Minus size={24} color="#374151" />
                        </TouchableOpacity>
                        
                        <TextInput
                            className="text-3xl font-bold text-gray-900 text-center w-24"
                            value={quantity}
                            onChangeText={handleQuantityChange}
                            onBlur={finalizeQuantity}
                            keyboardType="number-pad"
                            selectTextOnFocus
                        />

                        <TouchableOpacity 
                            onPress={() => handleQuantityChange((parseInt(quantity, 10) || 0) + 1)}
                            className="bg-gray-200 w-14 h-14 rounded-lg items-center justify-center"
                        >
                            <Plus size={24} color="#374151" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-sm text-gray-500 text-center mt-2">
                        Available Stock: {product.stock ?? 0} {product.unit || ''}
                    </Text>
                </View>
            </ScrollView>

            {/* Sticky Footer with Total Price and Purchase Button */}
            <View className="absolute bottom-0 w-full bg-white p-4 pt-4 border-t-2 border-gray-100">
              <View className="flex-row items-center justify-between">
                <View>
                    <Text className="text-sm text-gray-500">Total Price</Text>
                    <Text className="text-3xl font-bold text-green-700">
                        {totalPrice.toLocaleString()} DZD
                    </Text>
                </View>
                <TouchableOpacity
                  onPress={handlePurchase}
                  disabled={isPlacingOrder}
                  className={`h-14 rounded-2xl flex-1 ml-4 flex-row items-center justify-center ${isPlacingOrder ? 'bg-green-400' : 'bg-green-700'}`}
                >
                  {isPlacingOrder ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-white font-bold text-lg">Confirm Purchase</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
        </SafeAreaView>
    );
};

export default BuyProductScreen;
