import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import { ThemeProvider } from "./src/context/ThemeContext";
import { GameSettingsProvider } from "./src/context/GameSettingsContext";

export default function App() {
  return (
    <ThemeProvider>
      <GameSettingsProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </GameSettingsProvider>
    </ThemeProvider>
  );
}