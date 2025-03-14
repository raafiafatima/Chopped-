import React, { Component } from 'react'
import { Text, View, TouchableOpacity , ImageBackground} from 'react-native'

export default function index () {
    return (
      <ImageBackground
      source={require("../assets/download.jpg")}
      className="flex-1 justify-center bg-cover"
    >
      <View className="flex-1 justify-center items-center bg-grey-600">
        <Text style={{ fontFamily: 'Barrio-Regular', fontSize: 54, color: 'black' }}> CHOPPED </Text>
        <Text style={{ fontFamily: 'serif', fontSize: 18, color: '#760F13' }} className="text-center mt-10"> Let’s Turn Ingredients into Recipes! </Text>  
        <TouchableOpacity
            className="bg-white py-2.5 px-10 rounded-full items-center justify-center w-[60%] shadow-lg shadow-black/40 top-10"
            onPress={() => {
              console.log("Get Started Pressed, navigation to sign in page");
              // router.push("/(auth)/sign-in");
            }}
          >
            {console.log("pressed")}
            <Text className="text-[#760F13] text-lg font-bold">
              Get Started
            </Text>
          </TouchableOpacity>
      </View>
    </ImageBackground>
      
    )
  }
