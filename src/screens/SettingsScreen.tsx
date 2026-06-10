import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useGameSettings, PieceStyle } from "../context/GameSettingsContext";

export default function SettingsScreen() {
    const [mode, setMode] = useState<"single" | "two">("two");
    const { theme, toggleTheme } = useTheme();
    const { pieceStyle, setPieceStyle } = useGameSettings();

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
            <View style={styles.toggleRow}>
                <Text style={[styles.toggleLabel, isDark && styles.darkText]}>Dark Mode</Text>
                <Switch
                    value={isDark}
                    onValueChange={toggleTheme}
                    trackColor={{ false: "#767577", true: "#2e7d32" }}
                    thumbColor={isDark ? "#ffffff" : "#f4f3f4"}
                />
            </View>

            {/* GAME MODE TOGGLE */}
            <View style={styles.toggleRow}>
                <Text style={[styles.toggleLabel, isDark && styles.darkText]}>Two Player Mode</Text>
                <Switch
                    value={mode === "two"}
                    onValueChange={(val) => setMode(val ? "two" : "single")}
                    trackColor={{ false: "#767577", true: "#2e7d32" }}
                    thumbColor={mode === "two" ? "#ffffff" : "#f4f3f4"}
                />
            </View>

            <Text style={[styles.sectionTitle, isDark && styles.darkText, { marginTop: 20 }]}>Piece Style</Text>

            <View style={styles.pieceStyleGrid}>
                {(["symbol", "3d", "crystal", "glass", "wooden", "staunton", "california", "merida", "uscf", "cardinal"] as PieceStyle[]).map((style) => (
                    <TouchableOpacity
                        key={style}
                        style={[
                            styles.gridOption,
                            pieceStyle === style && styles.selected,
                            isDark && styles.optionDark,
                        ]}
                        onPress={() => setPieceStyle(style)}
                    >
                        <Text style={[isDark && styles.darkText, { fontSize: 13 }]} numberOfLines={1} adjustsFontSizeToFit>
                            {style === "3d" ? "3D" : style === "uscf" ? "USCF" : style.charAt(0).toUpperCase() + style.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

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

    toggleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#555",
    },

    toggleLabel: {
        fontSize: 18,
        fontWeight: "500",
    },

    pieceStyleGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "90%",
        gap: 10,
        marginTop: 10,
    },

    gridOption: {
        width: "30%",
        paddingVertical: 12,
        backgroundColor: "#ddd",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },

    optionDark: {
        backgroundColor: "#333",
    },

    selected: {
        borderWidth: 2,
        borderColor: "#2e7d32",
    },
});