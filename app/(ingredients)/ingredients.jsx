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
import { useEffect, useState } from "react";
import IngredientCard from "../../components/IngredientCard";
import Entypo from "@expo/vector-icons/Entypo";
import { API_KEY, BASE_URL } from "@env";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard";

export default function UseMyIngredients() {
  const [item, setItem] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [recipes, setRecipes] = useState([]); //for recipes // render recipes in a flat list
  const [show, setShow] = useState(true); // to show recipes in the view; true = recipes are showing, false = icon and text are showing
  const [query, setQuery] = useState(); // this is for converting list of ingredients into string

  // function for handling submit when adding ingredients
  const handleSubmit = () => {
    if (item) {
      setIngredientList((prev) => [
        { id: String(Date.now()), name: item },
        ...prev,
      ]);
    }
    setItem("");
  };

  // function for handling deletion of items from the ingredient list
  const deleteItem = (id) => {
    const newList = ingredientList.filter((item) => item.id != id);
    setIngredientList(newList);
  };

  // function to handle explore logic
  const handleExplor = () => {
    if (ingredientList.length === 0) {
      Alert.alert(
        "Missing Ingredients",
        "Please add at least one ingredient to explore recipes!"
      );
      setShow(false);
      return;
    }
    // converting the list of ingredients into string that will be used in the URL
    let urlQuery = ingredientList
      .map((ing) => ing.name.trim().toLowerCase())
      .join(",");

    setQuery(urlQuery);
    setIngredientList([]);
    setShow(true);

    getrecipe(urlQuery);
  };

  // function to get recipe from API
  async function getrecipe(ing) {
    try {
      // getting list of recipes that match the ingredients
      let resp = await axios.get(
        `${BASE_URL}/findByIngredients?apiKey=${API_KEY}&ingredients=${ing}&number=1`
      );

      setRecipes(
        resp.data.map((rec) => ({
          id: rec.id,
          title: rec.title,
          ingredient: rec.usedIngredients.map((ing) => ing.name),
          img: rec.image,
        }))
      );

      //
      console.log("QUERY:\n", ing);
      console.log(
        resp.data.map((rec) => ({
          id: rec.id,
          title: rec.title,
          ingredient: rec.usedIngredients.map((ing) => ing.name),
          img: rec.image,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <View className="flex-1 bg-beige">
        <SafeAreaView className = "flex-1">
          {/* header view */}
          <Header type={2}></Header>

          {/* Input and Explore View */}
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
            <TouchableOpacity onPress={handleExplor}>
              <View className="border border-lgreen p-4 rounded-xl bg-beige drop-shadow-xl elevation-lg overflow-hidden w-28 h-14 items-center justify-center ">
                <Text className="font-light">Explore</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Ingredients Card View Scrollable */}
          <View className="m-4">
            <FlatList
              horizontal={true}
              data={ingredientList}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => {
                return (
                  <IngredientCard
                    name={item.name}
                    handlePress={() => deleteItem(item.id)}
                  ></IngredientCard>
                );
              }}
            ></FlatList>
          </View>

          {/* main view for showing recipes, initially shows icon and text for empty page */}

          {show ? (
            <>
              {/* Recipe card showing different recipes */}
              <View className="mx-1 flex-1">
                <FlatList
                  data={recipes}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      
                        <RecipeCard
                          id={item.id}
                          title={item.title}
                          img={item.img}
                          ingredientUsed={item.ingredient}
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
                <Entypo name="shopping-basket" size={104} color="#A4CFA5" />
                <Text className="text-center font-regular text-xl color-gray-600">
                  Add a few ingredients
                </Text>
                <Text className="text-center font-regular text-xl color-gray-600">
                  We’ll cook up some ideas for you.
                </Text>
              </View>
            </>
          )}
        </SafeAreaView>
      </View>
    </>
  );
}
