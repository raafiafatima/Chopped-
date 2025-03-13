import { Stack, SplashScreen } from "expo-router";
import React from "react";
import "../global.css";
import {useFonts} from 'expo-font'
import { useState , useEffect } from 'react'

const _layout = () => {

    SplashScreen.preventAutoHideAsync();
    const [fontsLoaded, error] = useFonts({
      "Barrio-Regular": require("../assets/fonts/Barrio-Regular.ttf"),
    });
  
    useEffect(() => {
      if (error) throw error;
  
      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    }, [fontsLoaded, error]);
  
    if (!fontsLoaded && !error) {
      return null;
    }
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default _layout;
