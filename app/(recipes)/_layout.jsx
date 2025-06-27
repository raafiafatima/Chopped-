import { Stack } from "expo-router";

export default function layout(){
    return(
        <Stack>
            <Stack.Screen
            name="recipes"
            options={{
                headerShown: false,
            }}/>
        </Stack>
    )
}