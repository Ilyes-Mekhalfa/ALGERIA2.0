import { DefaultEventsMap } from "@socket.io/component-emitter";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
// eslint-disable-next-line import/no-named-as-default
import io, { Socket } from "socket.io-client";

interface Message {
  // MongoDB ID for saved messages
  _id?: string;
  id?: string;
  text: string;
  senderId: string;
  chatRoomId: string;
  // Add other properties like 'createdAt', 'time', etc.
  [key: string]: any;
}

const SOCKET_URL = "http://10.179.54.216:3000";
const HTTP_URL = "http://10.179.54.216:3000";
const TEST_ROOM_ID = "farmer_123_buyer_456";
const SENDER_ID = "user_123";
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `${HTTP_URL}/api/messages/${TEST_ROOM_ID}`
        );
        const history = await response.json();

        setMessages(history);
        initializeSocket();
      } catch (error) {
        console.error("Failed to load chat history or connect:", error);
      }
    };

    const initializeSocket = () => {
      socket = io(SOCKET_URL);

      socket.on("connect", () => {
        // Join the room right after connecting
        socket.emit("join_room", TEST_ROOM_ID);
        console.log(`Socket connected and joined room: ${TEST_ROOM_ID}`);
      });

      // Listener for new real-time messages
      socket.on("receive_message", (data) => {
        console.log("Real-time message received:", data);
        setMessages((previousMessages): any => [...previousMessages, data]);
      });

      // Ensure listeners are cleaned up
      return () => {
        socket.off("receive_message");
        socket.disconnect();
      };
    };

    fetchHistory();
  }, []);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const messageData = {
      _id: Date.now().toString(),
      text: message,
      senderId: SENDER_ID,
      chatRoomId: TEST_ROOM_ID,
    };

    socket.emit("send_message", messageData);

    setMessages((list): any => [...list, messageData]);

    setMessage("");
  };

  // This function decides how to render a single message
  const renderItem = ({ item }: any) => {
    const isMyMessage = item.sender === SENDER_ID;

    return (
      <View
        className={`my-1 p-3 rounded-lg max-w-[80%] ${
          isMyMessage
            ? "bg-green-600 self-end mr-2" // My message (Right side, Green)
            : "bg-gray-200 self-start ml-2" // Farmer message (Left side, Gray)
        }`}
      >
        <Text className={isMyMessage ? "text-white" : "text-black"}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    // Main Container
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="p-4 pt-12 bg-green-700 shadow-sm">
        <Text className="text-white text-xl font-bold">Farmer John</Text>
      </View>

      {/* Message List */}
      <FlatList
        data={messages}
        keyExtractor={(item) =>
          item._id ? item._id.toString() : item.id!.toString()
        }
        renderItem={renderItem}
        className="flex-1 p-2"
      />

      {/* Input Area */}
      <View className="flex-row items-center p-3 bg-gray-100">
        <TextInput
          className="flex-1 bg-white p-3 rounded-full border border-gray-300 mr-2"
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          onPress={sendMessage}
          className="bg-green-700 p-3 rounded-full"
        >
          <Text className="text-white font-bold">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
