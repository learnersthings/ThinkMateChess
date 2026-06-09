import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarIcon: ({ color, size }) => {
                    let iconName: any;

                    if (route.name === "Home") {
                        iconName = "home-outline";
                    } else if (route.name === "Settings") {
                        iconName = "settings-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },

                tabBarActiveTintColor: "#2e7d32",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}