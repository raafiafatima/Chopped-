import { Stack } from "expo-router"

export default function layout(){
    return(
        <Stack>
        <Stack.Screen
        name="ingredients"
        options={{
            headerShown: false,
        }}/>
        </Stack>
    )
}