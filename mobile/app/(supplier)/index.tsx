import { View, Text } from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/SearchBar";
import { router } from "expo-router";

const Index = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <SafeAreaView>
      <Header />
      <SearchBar
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        placeholder="Search recipes..."
        onPress={() => router.push("/search")}
      />
    </SafeAreaView>
  );
};

export default Index;
