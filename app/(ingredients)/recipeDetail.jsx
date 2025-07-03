import axios from "axios";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

export default function recipeDetails() {
  const params = useGlobalSearchParams();
  // Parse the data correctly
  // const recipe = {
  //   id: params.recipeId,
  //   title: params.recipeTitle,
  //   image : params.recipeImg,
  //   ingredients: params.recipeIngredients
  //     ? JSON.parse(params.recipeIngredients)
  //     : [],
  //   instructions: params.recipeInstructions
  //     ? JSON.parse(params.recipeInstructions)
  //     : [],
  //   data: {
  //     servings: params.servings ? Number(params.servings) : 0,
  //     readyMinutes: params.readyTime ? Number(params.readyTime) : 0,
  //     url: params.url || "",
  //     summary: params.summary || "",
  //   },
  // };

  // console.log("Parsed recipe:", recipe);

  // dummy data
  let recipe = {
    data: {
      readyMinutes: 40,
      servings: 6,
      summary:
        'The recipe Baked Cinnamon Apple Slice Snack can be made <b>in about 40 minutes</b>. This recipe makes 6 servings with <b>137 calories</b>, <b>1g of protein</b>, and <b>4g of fat</b> each. For <b>59 cents per serving</b>, this recipe <b>covers 4%</b> of your daily requirements of vitamins and minerals. It is a good option if you\'re following a <b>gluten free, dairy free, and whole 30</b> diet. 1 person found this recipe to be tasty and satisfying. A mixture of earth balance, earth balance, raisins, and a handful of other ingredients are all it takes to make this recipe so tasty. It is brought to you by Foodista. Only a few people really liked this side dish. Taking all factors into account, this recipe <b>earns a spoonacular score of 3%</b>, which is improvable. If you like this recipe, you might also like recipes such as <a href="https://spoonacular.com/recipes/apricot-slice-632678">Apricot Slice</a>, <a href="https://spoonacular.com/recipes/baked-cinnamon-apple-wedges-633548">Baked Cinnamon Apple Wedges</a>, and <a href="https://spoonacular.com/recipes/antioxidant-almond-snack-mix-632425">Antioxidant Almond Snack Mix</a>.',
      url: "https://www.foodista.com/recipe/JQWGC7VW/baked-cinnamon-apple-slices",
    },
    id: "633547",
    image: "https://img.spoonacular.com/recipes/633547-312x231.jpg",
    ingredients: [
      { amount: 4, originalIngredient: "4 Apples", title: "apples", unit: "" },
      {
        amount: 1.5,
        originalIngredient: "1 1/2 tablespoons of Cinnamon",
        title: "cinnamon",
        unit: "tablespoons",
      },
      {
        amount: 0.5,
        originalIngredient: "1/2 cup of Raisins",
        title: "raisins",
        unit: "cup",
      },
      {
        amount: 2,
        originalIngredient: "2 tablespoons of margarine",
        title: "margarine",
        unit: "tablespoons",
      },
    ],
    instructions: [
      "Melt the margarine quickly in the microwave.",
      "Mix ingredients together except the raisins.",
      "Place in baking dish and in oven at 350 degrees F for 30 minutes.",
      "Add raisins the last 5 minutes of baking.",
      "Serve and enjoy!",
    ],
    title: "Baked Cinnamon Apple Slice Snack",
  };

  const cleanSummary = (htmlSummary) => {
    const cleanText = htmlSummary.replace(/<[^>]+>/g, "");
    const timeMatch = htmlSummary.match(/in about (\d+) minutes/);
    const caloriesMatch = htmlSummary.match(/(\d+) calories/);
    const proteinMatch = htmlSummary.match(/(\d+g) of protein/);
    const fatMatch = htmlSummary.match(/(\d+g) of fat/);

    return{
      cleanText,
    time: timeMatch?.[1] || 'N/A',
    calories: caloriesMatch?.[1] || 'N/A',
    protein: proteinMatch?.[1] || 'N/A',
    fat: fatMatch?.[1] || 'N/A'
    }
  };

  const summaryData = cleanSummary(recipe.data.summary)

  return (
    <>
      <SafeAreaView className="flex-1">
        {/* header */}
        <Header type={2}></Header>

        {/* view for image and title */}
        <View className="flex-row">
          {/* image */}
          <View className="pl-4 pt-2">
            <Image
              source={{ uri: recipe.image }}
              style={{ width: 150, height: 136, borderRadius: 10 }}
            ></Image>
          </View>
          {/* title and servings */}
          <View className="flex-1 pr-1 pl-3">
            <Text className="text-2xl font-rsextrabold color-green">
              {recipe.title}
            </Text>
            <Text className="text-lg font-rsregular">
              Ready in: {recipe.data.readyMinutes} minutes
            </Text>
            <Text className="text-lg font-rsregular">
              Servings: {recipe.data.servings}
            </Text>
          </View>
        </View>

        {/* ingredients */}
        <View className="mt-4 ml-4">
          <Text className="text-lg font-rsbold ">INGREDIENTS:</Text>
          {recipe.ingredients.map((ing, index) => (
            <Text key={index} className="text-base">
              - {ing.title} ({ing.amount} {ing.unit})
            </Text>
          ))}
        </View>

        {/* instructions */}
        <View className=" pt-2">
          <Text className="text-lg font-rsbold">INSTRUCTIONS:</Text>
          {recipe.instructions.map((step, index) => (
            <Text key={index} className="text-base">
              {index + 1}. {step}
            </Text>
          ))}
        </View>
        <View className="">
          <Text className="text-lg font-rsbold">SUMMARY:</Text>
          <Text>{summaryData.cleanText}</Text>
        </View>
      </SafeAreaView>
    </>
  );
}
