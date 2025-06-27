import { Stack } from "expo-router";

export default function layout() {
    return(
        <Stack>
            <Stack.Screen
            name="chatbot"
            options={{
                headerShown: false,
            }}/>
        </Stack>
    )
}