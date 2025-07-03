import { Image, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { API_KEY, BASE_URL } from "@env";
import { router } from "expo-router";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

export default function RecipeCard({ id, title, img, ingredientUsed, likes }) {
  // 1. Initialize state properly
  const [serving, setServing] = useState("");
  const [time, setTime] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  // handle calling API, passing data and navigating to details page
  const handlePress = async () => {
    if (isFetching) return;

    try {
      setIsFetching(true);

      const resp = await axios.get(
        `${BASE_URL}/${id}/information?apiKey=${API_KEY}`
      );

      console.log("RAW API DATA:", resp.data);
      console.log(resp.data.readyInMinutes);

      setServing(resp.data.servings);
      setTime(resp.data.readyInMinutes);

      router.push({
        pathname: "/recipeDetail",
        params: {
          recipeId: id,
          recipeTitle: title,
          recipeImg: img,
          recipeInstructions: JSON.stringify(
            resp.data.analyzedInstructions?.[0]?.steps?.map(
              (step) => step.step
            ) ||
              resp.data.instructions
                ?.replace(/<[^>]+>/g, "")
                .split("\n")
                .filter((step) => step.trim() !== "") ||
              []
          ),
          recipeIngredients: JSON.stringify(
            resp.data.extendedIngredients?.map((ing) => ({
              title: ing.nameClean || ing.name,
              amount: ing.amount,
              unit: ing.unit,
              originalIngredient: ing.original,
            })) || []
          ),
          servings: resp.data.servings,
          readyTime: resp.data.readyInMinutes,
          prepTime: resp.data.preparationMinutes,
          url: resp.data.sourceUrl || "",
          source: resp.data.sourceName,
        },
      });
    } catch (error) {
      console.log("failed to catch recipe", error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <View className="m-3">
        <View className="border border-lgreen rounded-2xl shadow-md shadow-black elevation-[4] bg-beige overflow-hidden">
          <View className="flex-row pt-6 pl-4">
            <Image
              source={{ uri: img }}
              style={{ width: 100, height: 91, borderRadius: 10 }}
            />
            <View className="flex-1 pt-1 pl-4 pr-2 pb-4">
              <Text
                className="font-rsextrabold color-green text-2xl"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {title.trim()}
              </Text>
              <Text
                className="font-regular color-grey text-base"
                numberOfLines={2}
                style={{ textTransform: "capitalize" }}
              >
                Ingredients: {ingredientUsed.join(", ")}
              </Text>
              {/* <Text className="font-rsregular color-green text-base">
                {time} mins • {serving} servings
              </Text> */}
              <View className = "flex-row gap-2">
                <Entypo name="heart" size={18} color="#A4CFA5" />
                <Text className="font-regular color-gray-900 text-sm">
                  {likes} Likes
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row-reverse pr-6 pb-5 mt-0">
            <TouchableOpacity onPress={handlePress}>
              <AntDesign name="arrowright" size={24} color="#016938" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
