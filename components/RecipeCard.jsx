import { Text, TouchableOpacity, View } from "react-native";

export default function RecipeCard({name, img, ingredientUsed, handlePress}) {
    return (
        <>
        <TouchableOpacity >
        <View className="border border-lgreen rounded-2xl shadow-md bg-beige p-4">
          <Text className="font-rsextrabold text-2xl color-green m-2">
            {name}
          </Text>
          <Text className="font-rsregular text-lg color-grey mt-2 mx-2">
            {ingredientUsed}
          </Text>
          
        </View>
      </TouchableOpacity>
        </>
    )
}