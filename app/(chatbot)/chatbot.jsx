import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { View } from "react-native";

export default function ChatBot() {
  return (
    <>
      <View className="flex-1 bg-beige">
        <SafeAreaView>
          <Header text={"ASK ANYTHING"}></Header>
        </SafeAreaView>
      </View>
    </>
  );
}
