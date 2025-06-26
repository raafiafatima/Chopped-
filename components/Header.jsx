import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"; // logo and account
import Ionicons from "@expo/vector-icons/Ionicons"; // back icons
import { TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function Header({ type }) {
  return (
    <>
      <View className="flex flex-row justify-between p-6">
        {type == 1 ? (
          <>
            <TouchableOpacity onPress={() => {router.push("/")}}>
              <View className="w-14 h-14 rounded-full bg-green justify-center items-center">
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={30}
                  color="#F5F2E9"
                />
              </View>
            </TouchableOpacity>
            <View className="mt-2">
              <MaterialCommunityIcons
                name="account"
                size={40}
                color="#016938"
              />
            </View>
          </>
        ) : null}
      </View>
    </>
  );
}
