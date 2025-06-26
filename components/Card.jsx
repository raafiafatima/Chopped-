import { Text , View} from "react-native";

export default function Card({ heading, text }) {
  return (
    <>
      <View className = "border border-lgreen rounded-2xl shadow-md bg-beige p-4">
        <Text className = "font-rsextrabold text-2xl color-green m-4">{heading}</Text>
        <Text className = "font-rsregular text-lg color-grey mt-2">{text}</Text>
      </View>
    </>
  );
}
