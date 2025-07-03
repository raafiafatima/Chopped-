import { Stack } from "expo-router"

export default function layout(){
    return(
        <Stack>
        <Stack.Screen
        name="recipeDetail"
        options={{
            headerShown: false,
        }}/>
        </Stack>
    )
}