import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"; // logo and account
import Ionicons from "@expo/vector-icons/Ionicons"; // back icons
import { TouchableOpacity, View, Text } from "react-native";
import { router } from "expo-router";

// type = 1 : logo and profile, for start page 
// type = 2 : back and profile, for recipe detail page 
// text : for whenever needed, usually main pages  

export default function Header({ type, text }) {
  return (
    <>
      <View
        className={`flex-row justify-between ${
          type === 1 ? "p-4" : "p-2 mb-2"
        }`}
      >
        {/* Left Button */}
        {type === 1 ? (
          <TouchableOpacity onPress={() => router.push("/")}>
            <View className="mt-2 w-14 h-14 rounded-full bg-green justify-center items-center">
              <MaterialCommunityIcons
                name="silverware-fork-knife"
                size={30}
                color="#F5F2E9"
              />
            </View>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity onPress={() => router.back()}>
              <View className="mt-2 bg-lgreen justify-center items-center"  style = {{backgroundColor : type ===2 ? "rgba(0, 0, 0, 0.3)" : "#106938", width: 50, height: 50, borderRadius : 25}}>
                <Ionicons
                  name="chevron-back-outline"
                  size={30}
                  color="#F5F2E9"
                />
              </View>
            </TouchableOpacity>
            <View className = "mt-2 justify-center items-center">
              <Text className = "font-bold text-lg text-green">{text}</Text>
            </View>
          </>
        )}

        {/* Right Button (Account) */}
        <View className=" mt-2 justify-center items-center" style = {{backgroundColor : type === 2 ? "rgba(0, 0, 0, 0.3)" : "#106938", width: 50, height: 50, borderRadius : 25}}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="account"
              size={35}
              color= '#F5F2E9'
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
