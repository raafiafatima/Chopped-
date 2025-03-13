import { Stack } from "expo-router";
import React from "react";
import "../global.css";

const _layout = () => {
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
