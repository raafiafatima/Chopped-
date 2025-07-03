import { Image, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { API_KEY, BASE_URL } from "@env";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function RecipeCard({
  id,
  title,
  img,
  ingredientUsed,
}) {
  // 1. Initialize state properly
  const [serving, setServing] = useState(''); 
  const [time, setTime] = useState(''); 
  const [recipe, setRecipe] = useState({
    ingredients: [],
    instructions: [],
    data: null,
    loading: false,
    error: null,
  });
  // 2. Modified getRecipe function
  async function getRecipe() {
    try {
      setRecipe((prev) => ({ ...prev, loading: true }));

      const resp = await axios.get(
        `${BASE_URL}/${id}/information?apiKey=${API_KEY}`
      );

      
      const extractedData = {
        ingredients: resp.data.extendedIngredients.map((ing) => ({
          title: ing.nameClean || ing.name,
          amount: ing.amount,
          unit: ing.unit,
          originalIngredient: ing.original,
        })),
        instructions:
          resp.data.analyzedInstructions?.[0]?.steps.map((step) => step.step) ||
          resp.data.instructions
            ?.replace(/<[^>]+>/g, "")
            .split("\n")
            .filter((step) => step.trim() !== "") ||
          [],
        data: {
          servings: resp.data.servings,
          readyMinutes: resp.data.readyInMinutes,
          url: resp.data.sourceUrl,
          summary: resp.data.summary,
        },
      };
      
      console.log("Fetched recipe:", extractedData);
      setRecipe({
        ...extractedData,
        loading: false,
        error: null,
      });

    } catch (error) {
      console.error("Failed to fetch recipe:", error);
      setRecipe((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  }
  // handle passing data and navigating to details page
  const handlePress = async () => {
    try {
      await getRecipe();

      await new Promise(resolve => setTimeout(resolve, 50))
      if(!recipe.data) {
        throw new Error('recipe data not loaded')
      }
       router.push({
        pathname: "/recipeDetail",
        params: {
          recipeId: id,
          recipeTitle: title,
          recipeImg: img,
          recipeInstructions: JSON.stringify(recipe.instructions),
          recipeIngredients: JSON.stringify(recipe.ingredients),
          servings: recipe.data.servings,
          readyTime: recipe.data.readyMinutes,
          url: recipe.data.url,
          summary: recipe.data.summary,
        },
      });

      setServing(recipe.data.servings)
      setTime(recipe.data.readyMinutes)
    } catch (error) {
      console.log(error)
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
                className="font-rsregular color-grey text-base"
                numberOfLines={2}
                style={{ textTransform: 'capitalize' }}
              >
                Ingredients: {ingredientUsed.join(", ")}
              </Text>
              <Text className="font-rsregular color-green text-base">{time} mins • {serving} servings</Text>

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

