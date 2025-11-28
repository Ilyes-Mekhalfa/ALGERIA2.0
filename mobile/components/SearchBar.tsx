import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, value, onPress, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center rounded-full px-5 py-4 bg-white">
      <Image
        source={require("@/assets/images/search.png")}
        resizeMode="contain"
        className="size-5"
        tintColor="#000"
      />

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#6B7280"
        className="flex-1 ml-2 text-black"
      />
    </View>
  );
};

export default SearchBar;
