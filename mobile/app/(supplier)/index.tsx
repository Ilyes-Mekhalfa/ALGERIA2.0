import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <SafeAreaView>
      <Header />
    </SafeAreaView>
  );
};

export default index;
