import { Stack, SplashScreen } from "expo-router";
import React from "react";
import "../global.css";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";

const _layout = () => {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, [])
  const [fontsLoaded, error] = useFonts({
    "Barrio-Regular": require("../assets/fonts/Barrio-Regular.ttf"),
    "RobotoSlab-Thin": require("../assets/fonts/RobotoSlab-Thin.ttf"),
    "RobotoSlab-ExtraLight": require("../assets/fonts/RobotoSlab-ExtraLight.ttf"),
    "RobotoSlab-Light": require("../assets/fonts/RobotoSlab-Light.ttf"),
    "RobotoSlab-Regular": require("../assets/fonts/RobotoSlab-Regular.ttf"),
    "RobotoSlab-Medium": require("../assets/fonts/RobotoSlab-Medium.ttf"),
    "RobotoSlab-SemiBold": require("../assets/fonts/RobotoSlab-SemiBold.ttf"),
    "RobotoSlab-Bold": require("../assets/fonts/RobotoSlab-Bold.ttf"),
    "RobotoSlab-ExtraBold": require("../assets/fonts/RobotoSlab-ExtraBold.ttf"),
    "RobotoSlab-Black": require("../assets/fonts/RobotoSlab-Black.ttf"),
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
      {/* <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="(homepage)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default _layout;
