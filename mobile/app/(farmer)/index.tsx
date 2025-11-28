import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Feather, Ionicons } from "@expo/vector-icons";
import HomeGrid from "@/components/HomeGrid";
import { useRouter } from "expo-router";

const data = [
  { id: 1, title: "Total Earning", value: "45 280 DA" },
  { id: 2, title: "Total Products", value: "13" },
  { id: 3, title: "Orders", value: "12" },
  { id: 4, title: "Rating Stars", value: "2.8%" },
];

const Index = () => {

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F4FDF6]">
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        className="px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        columnWrapperStyle={{
          gap: 16, // Adds 16px space between the two columns
        }}
        // 📌 HEADER
        ListHeaderComponent={
          <>
            <Header />
            <View className="flex-row justify-evenly items-center mt-6 mb-8">
              <Text className="text-3xl font-extrabold">Dashboard</Text>
              <TouchableOpacity onPress={() => router.replace("/new")} className="flex-row items-center bg-[#50C878] px-5 py-3 rounded-full">
                <Ionicons name="add" size={22} color="#fff" />
                <Text className="text-white font-semibold ml-1 text-lg">
                  Add Product
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View className="flex-1 mb-4">
            <HomeGrid title={item.title} value={item.value} />
          </View>
        )}
        // 📌 FOOTER
        ListFooterComponent={
          <>
            <Text className="text-lg font-semibold mt-10 mb-3">
              This Month Performance
            </Text>
            <View className="bg-white border border-gray-300 p-6 rounded-xl min-h-[180px] justify-center items-center">
              <Feather name="pie-chart" size={40} color="#999" />
              <Text className="text-gray-500 mt-3 text-center">
                No product sales data yet. Create a product to get started!
              </Text>
            </View>
            <View className="h-20" />
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Index;
