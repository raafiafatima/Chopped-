import { ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Card from "../../components/HomePageCard";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from "expo-router";

export default function homepage() {
  return (
    <>
      <SafeAreaView className="bg-beige flex-1" >
        <View className="rounded-b-3xl drop-shadow-xl elevation-lg overflow-hidden">
          <ImageBackground
            source={require("../../assets/images/bg.jpg")}
            className=" w-screen"
          >
            <Header type={1}></Header>
            <View className="mt-4 mb-10 mx-8 ">
              <Text className="font-rsextrabold text-5xl color-green">
                Hello there,{" "}
              </Text>
              <Text className="font-rsextrabold text-3xl mt-4 color-grey">
                How can i help you today?{" "}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View className="mx-5 mt-6 mb-3">
          <Card
            heading={"Use My Ingredients"}
            text={"Tell us what you got — we’ll find the perfect match. "}
            icon={
              <FontAwesome name="shopping-basket" size={34} color="#016938" />
            }
            handlePress={() => {router.push("/ingredients")}}
          ></Card>
        </View>
        <View className="mx-5 my-3">
          <Card
            heading={"Search Recipe Ideas"}
            text={"Look up recipes by name — from pasta to brownies, it’s all here!"}
            icon={<Fontisto name="search" size={34} color="#016938" />}
            handlePress={() => {router.push("/recipes")}}
          ></Card>
        </View>
        <View className="mx-5 my-3">
          <Card
            heading={"What Should I Eat?"}
            text={"Tell us what you got — we’ll find the perfect match. "}
            icon={<Entypo name="bowl" size={34} color="#016938" />}
            handlePress={() => {router.push("/chatbot")}}
          ></Card>
        </View>
      </SafeAreaView>
    </>
  );
}
