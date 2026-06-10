import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useGameSettings, PieceStyle } from "../context/GameSettingsContext";

export default function SettingsScreen() {
    const [mode, setMode] = useState<"single" | "two">("two");
    const { theme, toggleTheme } = useTheme();
    const { pieceStyle, setPieceStyle, boardMode, setBoardMode } = useGameSettings();

    const isDark = theme === "dark";

    return (
        <ScrollView
            style={[
                styles.container,
                isDark ? styles.darkBg : styles.lightBg,
            ]}
            contentContainerStyle={styles.contentContainer}
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

            <Text style={[styles.sectionTitle, isDark && styles.darkText]}>Game Mode</Text>

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

            <Text style={[styles.sectionTitle, isDark && styles.darkText, { marginTop: 20 }]}>Board Perspective</Text>
            
            <TouchableOpacity
                style={[
                    styles.option,
                    boardMode === "2d" && styles.selected,
                    isDark && styles.optionDark,
                ]}
                onPress={() => setBoardMode("2d")}
            >
                <Text style={isDark && styles.darkText}>2D Top-Down</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.option,
                    boardMode === "3d" && styles.selected,
                    isDark && styles.optionDark,
                ]}
                onPress={() => setBoardMode("3d")}
            >
                <Text style={isDark && styles.darkText}>3D Interactive</Text>
            </TouchableOpacity>

            <Text style={[styles.sectionTitle, isDark && styles.darkText, { marginTop: 20 }]}>Piece Style</Text>
            
            {(["symbol", "3d", "crystal", "glass", "wooden", "staunton", "california", "merida", "uscf", "cardinal"] as PieceStyle[]).map((style) => (
                <TouchableOpacity
                    key={style}
                    style={[
                        styles.option,
                        pieceStyle === style && styles.selected,
                        isDark && styles.optionDark,
                    ]}
                    onPress={() => setPieceStyle(style)}
                >
                    <Text style={isDark && styles.darkText}>
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                    </Text>
                </TouchableOpacity>
            ))}

            <Text
                style={[
                    styles.status,
                    isDark && styles.darkText,
                ]}
            >
                Current Mode: {mode}
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingVertical: 40,
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

    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
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