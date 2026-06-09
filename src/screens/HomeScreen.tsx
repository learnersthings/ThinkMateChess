import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen({ navigation }: any) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <View
            style={[
                styles.container,
                isDark ? styles.darkBg : styles.lightBg,
            ]}
        >
            <Text style={[styles.title, isDark && styles.darkText]}>
                ♟ ThinkMate Chess
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Game")}
            >
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
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
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
    },

    darkText: {
        color: "#ffffff",
    },

    button: {
        backgroundColor: "#2e7d32",
        padding: 14,
        borderRadius: 10,
    },

    buttonText: {
        color: "white",
        fontSize: 18,
    },
});