import { Search, SlidersHorizontal } from "lucide-react-native";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
  inputRef?: any;
}

const SearchBar = ({ placeholder, value, onPress, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center gap-3 mb-6">
      <View className="flex-1 flex-row items-center bg-white border border-gray-200 h-14 rounded-2xl px-4">
        <Search size={22} color="gray" />
        <TextInput
          className="flex-1 ml-3 text-base text-black font-medium"
          placeholder="Search..."
          onPress={onPress}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity className="bg-white border border-gray-200 h-14 w-14 rounded-2xl items-center justify-center">
        <SlidersHorizontal size={22} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
