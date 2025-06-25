import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function index() {
  return (
    <>
      <SafeAreaView className="flex-1">
        <ImageBackground
          source={require("../assets/Main_Bg.jpg")}
          className="flex-1"
        >
          <View className = "justify-center items-center mt-28">
            <View className="w-40 h-40 rounded-full bg-beige justify-center items-center">
              
          <MaterialCommunityIcons name="silverware-fork-knife" size={84} color="#016938" />
        
            </View>
          </View>

          <View className="justify-center items-center mt-20 ">
            <Text className="font-rsextrabold text-6xl color-beige">
              CHOPPED
            </Text>
            <Text className="color-beige mt-3 font-rsregular text-lg">
              Think Less, Eat Better
            </Text>
          </View>

          <View className="justify-center items-center mt-64">
            <Text className="font-rsextrabold text-4xl color-beige">
              Welcome!
            </Text>
            <TouchableOpacity className="bg-beige px-20 py-4 m-4 rounded-full justify-center items-center ">
              <Text className="font-rsregular text-2xl color-green">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}
