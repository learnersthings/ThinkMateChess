import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigator";
import GameScreen from "../screens/GameScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Tabs"
                component={TabNavigator}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Game"
                component={GameScreen}
                options={{ title: "Chess Game" }}
            />
        </Stack.Navigator>
    );
}