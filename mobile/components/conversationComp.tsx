import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { ConversationType } from "@/lib/convTypes";

type Props = {
  conversation: ConversationType;
  openConversation: (c: ConversationType) => void;
  deleteConversation: (id: number) => void;
};

const ConversationsComp = ({
  conversation,
  openConversation,
  deleteConversation,
}: Props) => {
  return (
    <TouchableOpacity
      className="flex-row items-center p-4 border-b border-gray-100 active:bg-gray-50"
      onPress={() => openConversation(conversation)}
      onLongPress={() => deleteConversation(conversation.id)}
    >
      {/* Avatar */}
      <Image
        source={{ uri: conversation.user.avatar }}
        className="size-12 rounded-full mr-3"
      />

      {/* Text content */}
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <View className="flex-row items-center gap-1">
            <Text className="font-semibold text-gray-900">
              {conversation.user.name}
            </Text>
            {conversation.user.verified && (
              <Feather name="check-circle" size={16} color="#1DA1F2" />
            )}
            <Text className="text-gray-500 text-sm ml-1">
              @{conversation.user.username}
            </Text>
          </View>
          <Text className="text-gray-500 text-sm">{conversation.time}</Text>
        </View>
        <Text className="text-sm text-gray-500" numberOfLines={1}>
          {conversation.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ConversationsComp;
