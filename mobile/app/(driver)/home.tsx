import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function FeedScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold">Feed Screen</Text>
      <Button
        title="Go to Post Details"
        onPress={() => router.push("login")}
      />
    </View>
  );
}
