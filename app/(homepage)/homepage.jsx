import { ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Card from "../../components/Card"


export default function homepage() {
  return (
    <>
      <SafeAreaView className="bg-beige flex-1">
        <View className="rounded-b-3xl drop-shadow-xl elevation-lg overflow-hidden">
          <ImageBackground source={require("../../assets/images/bg.jpg")} className=" w-screen">
            <Header type={1}></Header>
            <View className= "mt-4 mb-10 mx-8 ">
              <Text className = "font-rsextrabold text-5xl color-green">Hello there, </Text>
              <Text className = "font-rsextrabold text-3xl mt-4 color-grey">How can i help you today? </Text>
            </View>
          </ImageBackground>
        </View>
        <View>
            <Card heading={"Use My Ingredients"} text={"Tell us what you got — we’ll find the perfect match. "}></Card>
        </View>
      </SafeAreaView>
    </>
  );
}
