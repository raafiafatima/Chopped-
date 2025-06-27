import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { View } from "react-native";

export default function UseMyIngredients() {
  return (
    <>
      <View className = "flex-1 bg-beige"> 
        <SafeAreaView>
          <Header type={2}></Header>
        </SafeAreaView>
      </View>
    </>
  );
}
