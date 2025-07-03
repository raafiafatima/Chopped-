import { Text, TouchableOpacity, View } from "react-native";

export default function Card({ heading, text, icon, handlePress }) {
  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <View className="border border-lgreen rounded-2xl shadow-md bg-beige p-4">
          <Text className="font-extrabold text-2xl color-green m-2">
            {heading}
          </Text>
          <Text className="font-regular text-lg color-grey mt-2 mx-2">
            {text}
          </Text>
          <View className="flex-row-reverse p-2">{icon}</View>
        </View>
      </TouchableOpacity>
    </>
  );
}
