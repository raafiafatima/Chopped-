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
import IngredientCard from "../../components/IngredientCard";
import Entypo from "@expo/vector-icons/Entypo";
import { API_KEY, BASE_URL } from "@env";
import RecipeCard from "../../components/RecipeCard";

export default function UseMyIngredients() {
  const [item, setItem] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [recipe, setRecipe] = useState(); //for recipes // render recipes in a flat list
  const [show, setShow] = useState(false); // to show recipes in the view; true = recipes are showing, false = icon and text are showing

  const handleSubmit = () => {
    if (item) {
      setIngredientList((prev) => [
        { id: String(Date.now()), name: item },
        ...prev,
      ]);
    }
    setItem("");
  };

  const deleteItem = (id) => {
    const newList = ingredientList.filter((item) => item.id != id);
    setIngredientList(newList);
  };
  return (
    <>
      <View className="flex-1 bg-beige">
        <SafeAreaView>
          {/* header view */}
          <Header type={2}></Header>

          {/* Input and Explore View */}
          <View className="flex-row items-center justify-between mt-4 ml-5 mr-5">
            <View>
              <TextInput
                className="border border-gray-200 p-4 rounded-xl bg-white text-base w-72 drop-shadow-xl elevation-lg overflow-hidden font-rslight"
                placeholder="Add Ingredients"
                value={item}
                onChangeText={setItem}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                if (ingredientList.length === 0) {
                  Alert.alert(
                    "Missing Ingredients",
                    "Please add at least one ingredient to explore recipes!"
                  );
                  setShow(false)
                }
                else{
                   setShow(true);
                }
                
              }}
            >
              <View className="border border-lgreen p-4 rounded-xl bg-beige drop-shadow-xl elevation-lg overflow-hidden w-28 h-14 items-center justify-center ">
                <Text className="font-rslight">Explore</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Ingredients Card View Scrollable */}
          <View className="m-4">
            <FlatList
              horizontal={true}
              data={ingredientList}
              keyExtractor={(item) => item.id}
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
            <View className = "justify-center items-center">
              {ingredientList.map((item) => {
                return(
                  <RecipeCard name={item.name}></RecipeCard>
                )
              })}

            </View>
            </>
          ) : (
            <>
              <View className="justify-center items-center mt-48">
                <Entypo name="shopping-basket" size={104} color="#A4CFA5" />
                <Text className="text-center font-rsregular text-xl color-gray-600">
                  Add a few ingredients
                </Text>
                <Text className="text-center font-rsregular text-xl color-gray-600">
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
