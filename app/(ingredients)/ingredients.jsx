import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import IngredientCard from "../../components/IngredientCard";

export default function UseMyIngredients() {
  const [item, setItem] = useState("");
  const [ingredientList, setIngredientList] = useState([]);

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
    const newList = ingredientList.filter((item) => item.id != id)
    setIngredientList(newList)
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
            <TouchableOpacity>
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
        </SafeAreaView>
      </View>
    </>
  );
}
