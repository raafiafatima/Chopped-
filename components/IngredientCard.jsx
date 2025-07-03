import Entypo from "@expo/vector-icons/Entypo";
import { View, Text, TouchableOpacity } from "react-native";

export default function IngredientCard({ name, handlePress }) {
  return (
    <>
      <View className=" flex-row justify-between items-center border border-lgreen rounded-xl bg-white px-2 py-3 mx-1 my-2">
        <View className = "pr-2">
          <TouchableOpacity hitSlop={20} onPress={handlePress}>
            <Entypo name="cross" size={20} color="#333333" />
          </TouchableOpacity>
        </View>
        <Text className="font-light ">{name}</Text>
      </View>
    </>
  );
}
