import { Image, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { API_KEY, BASE_URL } from "@env";

export default function RecipeCard({
  id,
  title,
  img,
  ingredientUsed,
  readyTime,
}) {
  // function for getting recipe details through id and passing it onto recipeDetail page via GlobalContext
  const getRecipe = () => {


  };

  const viewDetails = () => {

  };
  return (
    <>
      <View className="m-3">
        <View className="border border-lgreen rounded-2xl shadow-md bg-beige overflow-hidden">
          <View className="flex-row pt-6 pl-4">
            <Image
              source={{ uri: img }}
              style={{ width: 100, height: 91, borderRadius: 10 }}
            />
            <View className="flex-1 pt-2 pl-4 pr-2 pb-4">
              <Text
                className="font-rsextrabold color-green text-xl"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {title.trim()}
              </Text>
              <Text className="font-rsregular color-grey text-base mt-1">
                Ready In Minutes: {readyTime}
              </Text>
              <Text
                className="font-rsregular color-grey text-base"
                numberOfLines={2}
              >
                Ingredients: {ingredientUsed.join(",")}
              </Text>
            </View>
          </View>
          <View className="flex-row-reverse pr-3 pb-4 pt-2">
            <TouchableOpacity>
              <View className="border border-gray-500 bg-green rounded-xl p-0.5 w-36 items-center">
                <Text className="font-rsregular color-white text-base">
                  View Recipe
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

// write function to pass id and img for the recipe through global context search params by the view recipe function and then extract details for the recipe and display in recipe details
