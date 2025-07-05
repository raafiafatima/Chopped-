
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { Image, ScrollView, Text, View, Linking, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function recipeDetails() {
  const params = useGlobalSearchParams();
  // Parse the data correctly
  const recipe = {
    id: params.recipeId,
    title: params.recipeTitle,
    image: params.recipeImg,
    ingredients: params.recipeIngredients
      ? JSON.parse(params.recipeIngredients)
      : [],
    instructions: params.recipeInstructions
      ? JSON.parse(params.recipeInstructions)
      : ["None"],
    data: {
      servings: params.servings ? Number(params.servings) : 0,
      readyMinutes: params.readyTime ? Number(params.readyTime) : 0,
      prepMinutes: params.prepTime ? Number(params.prepTime) : 20,
      url: params.url || "",
      sourceName : params.source || "",
    },
  };

  console.log("Parsed recipe:", recipe);

  const handleOpenWebRecipe = async () => {
    try {
      const supported = await Linking.canOpenURL(recipe.data.url);
      if (supported) {
        await Linking.openURL(recipe.data.url);
      } else {
        console.log("Don't know how to open URI: " + recipe.data.url);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  // // dummy data
  // let recipe = {
  //   data: {
  //     readyMinutes: 40,
  //     prepMinutes: 25,
  //     servings: 6,
  //     summary:
  //       'The recipe Baked Cinnamon Apple Slice Snack can be made <b>in about 40 minutes</b>. This recipe makes 6 servings with <b>137 calories</b>, <b>1g of protein</b>, and <b>4g of fat</b> each. For <b>59 cents per serving</b>, this recipe <b>covers 4%</b> of your daily requirements of vitamins and minerals. It is a good option if you\'re following a <b>gluten free, dairy free, and whole 30</b> diet. 1 person found this recipe to be tasty and satisfying. A mixture of earth balance, earth balance, raisins, and a handful of other ingredients are all it takes to make this recipe so tasty. It is brought to you by Foodista. Only a few people really liked this side dish. Taking all factors into account, this recipe <b>earns a spoonacular score of 3%</b>, which is improvable. If you like this recipe, you might also like recipes such as <a href="https://spoonacular.com/recipes/apricot-slice-632678">Apricot Slice</a>, <a href="https://spoonacular.com/recipes/baked-cinnamon-apple-wedges-633548">Baked Cinnamon Apple Wedges</a>, and <a href="https://spoonacular.com/recipes/antioxidant-almond-snack-mix-632425">Antioxidant Almond Snack Mix</a>.',
  //     url: "https://www.foodista.com/recipe/JQWGC7VW/baked-cinnamon-apple-slices",
  //     source : 'Full Belly Sisters'
  //   },
  //   id: "633547",
  //   image: "https://img.spoonacular.com/recipes/633547-312x231.jpg",
  //   ingredients: [
  //     { amount: 4, originalIngredient: "4 Apples", title: "apples", unit: "" },
  //     {
  //       amount: 1.5,
  //       originalIngredient: "1 1/2 tablespoons of Cinnamon",
  //       title: "cinnamon",
  //       unit: "tablespoons",
  //     },
  //     {
  //       amount: 0.5,
  //       originalIngredient: "1/2 cup of Raisins",
  //       title: "raisins",
  //       unit: "cup",
  //     },
  //     {
  //       amount: 2,
  //       originalIngredient: "2 tablespoons of margarine",
  //       title: "margarine",
  //       unit: "tablespoons",
  //     },
  //   ],
  //   instructions: [
  //     "Melt the margarine quickly in the microwave.",
  //     "Mix ingredients together except the raisins.",
  //     "Place in baking dish and in oven at 350 degrees F for 30 minutes.",
  //     "Add raisins the last 5 minutes of baking.",
  //     "Serve and enjoy!",
  //   ],
  //   title: "Baked Cinnamon Apple Slice Snack",
  // };

  return (
    <>
      {/* <SafeAreaView className="flex-1 bg-beige"> */}
        <View className="absolute top-8 left-0 right-0 z-50">
          <Header type={2}></Header>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View className="relative h-80">
            <Image
              source={{ uri: recipe.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute bottom-0 left-0 right-0 bg-black/40 px-6 py-5">
              <Text className="text-2xl font-regular text-white leading-8">
                {recipe.title}
              </Text>
            </View>
          </View>

          {/* Recipe Meta */}
          <View className="flex-row bg-beige py-5 px-6">
            <View className="flex-1 items-center gap-1">
              <Feather name="users" size={24} color="#016938" />
              <Text className="text-xs text-gray-500 font-medium">
                Servings
              </Text>
              <Text className="text-sm text-gray-900 font-semibold">
                {recipe.data.servings}
              </Text>
            </View>
            <View className="w-px bg-gray-200 mx-4" />
            <View className="flex-1 items-center gap-1">
              <AntDesign name="clockcircleo" size={24} color="#016938" />
              <Text className="text-xs text-gray-500 font-medium">
                Prep Time
              </Text>
              <Text className="text-sm text-gray-900 font-semibold">
                {recipe.data.prepMinutes} mins
              </Text>
            </View>
            <View className="w-px bg-gray-200 mx-4" />
            <View className="flex-1 items-center gap-1">
              <MaterialCommunityIcons
                name="chef-hat"
                size={24}
                color="#016938"
              />
              <Text className="text-xs text-gray-500 font-medium">
                Total Time
              </Text>
              <Text className="text-sm text-gray-900 font-semibold">
                {recipe.data.readyMinutes} mins
              </Text>
            </View>
          </View>

          {/* Ingredients Section */}
          <View className="px-6 py-4">
            <Text className="text-xl font-bold text-gray-900 mb-4">
              INGREDIENTS
            </Text>
            <View className="gap-3">
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} className="flex-row items-start">
                  <View className="w-1.5 h-1.5 rounded-full bg-green mt-2 mr-2" />
                  <View className="flex-1 flex-row">
                    <Text className="w-48 text-md font-semibold text-green">
                      {" "}
                      {/* Fixed width */}
                      {ingredient.amount} {ingredient.unit} {/* Space added */}
                    </Text>
                    <Text className="flex-1 text-md text-gray-700 leading-5">
                      {ingredient.title}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Instructions Section */}
          <View className="px-6 py-6">
            <Text className="text-xl font-bold text-gray-900 mb-4">
              INSTRUCTIONS
            </Text>
            <View className="gap-5">
              {recipe.instructions.map((instruction, index) => (
                <View key={index} className="flex-row gap-4">
                  <View className="w-7 h-7 rounded-full bg-green items-center justify-center mt-0.5">
                    <Text className="text-sm font-bold text-white">
                      {index + 1}
                    </Text>
                  </View>
                  <Text className="flex-1 text-md text-gray-700 leading-6">
                    {instruction}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* external link section */}

          <View className="px-6 py-6">
            <View className="bg-green-50 rounded-xl p-5 border border-green">
              {/* Source Header */}
              <View className="flex-row items-center gap-2 mb-3">
                <Feather name="external-link" size={24} color="black" />
                <Text className="text-lg font-bold text-emerald-800">
                  View Original Recipe
                </Text>
              </View>

              {/* Description */}
              <Text className="text-sm text-gray-900 leading-5 mb-4">
                Want to see the complete recipe with additional tips, photos,
                and reviews? Tap below to visit the original recipe on{" "}
                <Text className="text-green font-bold">{recipe.data.sourceName}</Text>
              </Text>

              {/* Button */}
              <TouchableOpacity
                className="bg-green flex-row items-center justify-center gap-2 py-3 px-5 rounded-xl shadow-lg"
                onPress={handleOpenWebRecipe}
              >
                <Text className="text-base font-semibold text-white">
                  Open Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="h-8" />
        </ScrollView>
      {/* </SafeAreaView> */}
    </>
  );
}
