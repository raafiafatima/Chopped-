import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "@env";
import Header from "../../components/Header";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  // Handle keyboard appearance
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(inputText);
      const response = result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { text: text, sender: "bot" }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I couldn't process your request. Please try again.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-beige">
      {/* Header */}
      <View className="py-6 px-6">
        <Header text={"ASK ANYTHING"}></Header>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        {/* Messages area */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 p-4"
          contentContainerStyle={{ paddingBottom: keyboardHeight + 50 }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.length === 0 ? (
            <View className="flex-1 justify-center items-center mt-48">
              <FontAwesome6 name="carrot" size={110} color="#A4CFA5" />
              <Text className="text-center font-regular text-xl color-gray-600 mt-2">
                Can’t decide what to eat? {"\n "}
                Let’s figure it out together
              </Text>
            </View>
          ) : (
            messages.map((message, index) => (
              <View
                key={index}
                className={`max-w-[80%] p-3 rounded-lg mb-2 ${
                  message.sender === "user"
                    ? "bg-lgreen rounded-br-none ml-auto"
                    : "bg-white rounded-bl-none border border-lgreen"
                }`}
              >
                <Text
                  className={`text-base ${
                    message.sender === "user" ? "text-gray-800" : "text-gray-900"
                  }`}
                >
                  {message.text.replace(/[#*]/g, '')}
                </Text>
              </View>
            ))
          )}

          {isLoading && (
            <View className="max-w-[80%] p-3 rounded-lg rounded-bl-none bg-white border border-gray-200 mb-2">
              <Text className="text-gray-800 text-base">Thinking...</Text>
            </View>
          )}
        </ScrollView>

        {/* Input area */}
        <View
          className="flex-row p-3  border-t border-gray-200"
          style={{ paddingBottom: keyboardHeight > 0 ? keyboardHeight : 30 }}
        >
          <TextInput
            className="flex-1 min-h-[40px] max-h-[120px] px-4 py-4 bg-gray-200 rounded-full text-base"
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your recipe request..."
            placeholderTextColor="#999"
            multiline
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            className={`ml-2 px-4 py-2 rounded-full justify-center ${
              isLoading ? "bg-gray-400" : "bg-green"
            }`}
            onPress={sendMessage}
            disabled={isLoading}
          >
            <Text className="text-white font-bold">Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
