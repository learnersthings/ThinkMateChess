import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function SettingsScreen() {
    const [mode, setMode] = useState<"single" | "two">("two");
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === "dark";

    return (
        <View
            style={[
                styles.container,
                isDark ? styles.darkBg : styles.lightBg,
            ]}
        >
            <Text
                style={[
                    styles.title,
                    isDark && styles.darkText,
                ]}
            >
                Settings
            </Text>

            {/* THEME TOGGLE */}
            <TouchableOpacity
                style={styles.themeButton}
                onPress={toggleTheme}
            >
                <Text style={styles.buttonText}>
                    Switch to {isDark ? "Light" : "Dark"} Mode
                </Text>
            </TouchableOpacity>

            {/* GAME MODE: SINGLE */}
            <TouchableOpacity
                style={[
                    styles.option,
                    mode === "single" && styles.selected,
                    isDark && styles.optionDark,
                ]}
                onPress={() => setMode("single")}
            >
                <Text style={isDark && styles.darkText}>
                    Single Player
                </Text>
            </TouchableOpacity>

            {/* GAME MODE: TWO PLAYER */}
            <TouchableOpacity
                style={[
                    styles.option,
                    mode === "two" && styles.selected,
                    isDark && styles.optionDark,
                ]}
                onPress={() => setMode("two")}
            >
                <Text style={isDark && styles.darkText}>
                    Two Player
                </Text>
            </TouchableOpacity>

            <Text
                style={[
                    styles.status,
                    isDark && styles.darkText,
                ]}
            >
                Current Mode: {mode}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    lightBg: {
        backgroundColor: "#ffffff",
    },

    darkBg: {
        backgroundColor: "#121212",
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },

    darkText: {
        color: "#ffffff",
    },

    option: {
        padding: 12,
        width: 200,
        marginVertical: 6,
        backgroundColor: "#ddd",
        alignItems: "center",
        borderRadius: 8,
    },

    optionDark: {
        backgroundColor: "#333",
    },

    selected: {
        borderWidth: 2,
        borderColor: "#2e7d32",
    },

    status: {
        marginTop: 20,
        fontSize: 16,
    },

    themeButton: {
        padding: 12,
        backgroundColor: "#2e7d32",
        borderRadius: 8,
        marginBottom: 20,
    },

    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});