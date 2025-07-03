import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import axios from "axios";
import { API_KEY, BASE_URL } from "@env";
import RecipeCard from "../../components/RecipeCard";

export default function SearchRecipes() {
  const [item, setItem] = useState(""); // for input
  const [recipe, setRecipe] = useState([]); // sets the recipe
  const [query, setQuery] = useState(""); //takes the name of the query such as pasta, brownies, pizza etc
  const [show, setShow] = useState(false); // for showing empty space and recipe cards

  // function for handling submit
  const handleSubmit = () => {
    if (item) {
      setQuery(item);
    }
  };

  // function for calling API response
  const handleExplore = () => {
    if (!item) {
      Alert.alert("Missing Recipe", "Please add a name to explore recipes!");
      setShow(false);
      return;
    }
    setQuery(item);
    getRecipe(query);
    setShow(true);
    setItem("");
  };

  // function for making the API request and filtering data
  async function getRecipe(query) {
    try {
      let resp = await axios.get(
        `${BASE_URL}/complexSearch?apiKey=${API_KEY}&query=${query}&number=15`
      );

      console.log(resp.data);
      setRecipe(
        resp.data.results.map((rec) => ({
          id: rec.id,
          title: rec.title,
          img: rec.image,
        }))
      );
    } catch (error) {
      console.log("error while fetching data:", error);
    }
  }

  return (
    <>
      <View className="flex-1 bg-beige">
        <SafeAreaView className="flex-1">
          {/* header */}
          <Header text={"SEARCH RECIPES"}></Header>

          {/* search bar and explore button */}
          <View className="flex-row items-center justify-between mt-4 ml-5 mr-5">
            <View>
              <TextInput
                className="border border-gray-200 p-4 rounded-xl bg-white text-base w-72 drop-shadow-xl elevation-lg overflow-hidden font-light"
                placeholder="Add Ingredients"
                value={item}
                onChangeText={setItem}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
            </View>
            {/* explore button */}
            <TouchableOpacity onPress={handleExplore}>
              <View className="border border-lgreen p-4 rounded-xl bg-beige drop-shadow-xl elevation-lg overflow-hidden w-28 h-14 items-center justify-center ">
                <Text className="font-light">Explore</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* view for recipes */}
          {show ? (
            <>
              {/* Recipe card showing different recipes */}
              <View className="mx-1 flex-1">
                <FlatList
                  data={recipe}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <RecipeCard
                        id={item.id}
                        title={item.title}
                        img={item.img}
                        isRecipe={true}
                      ></RecipeCard>
                    );
                  }}
                ></FlatList>
              </View>
            </>
          ) : (
            <>
              {/* icon and text for empty page */}
              <View className="justify-center items-center mt-48">
                <Entypo name="bowl" size={104} color="#A4CFA5" />
                <Text className="text-center font-regular text-xl color-gray-600">
                  Looking for something yummy?
                </Text>
                <Text className="text-center font-regular text-xl color-gray-600">
                  Type a recipe to get started!
                </Text>
              </View>
            </>
          )}
        </SafeAreaView>
      </View>
    </>
  );
}
