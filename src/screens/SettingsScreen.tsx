import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useGameSettings, PieceStyle, Difficulty } from "../context/GameSettingsContext";

export default function SettingsScreen() {
    const { theme, toggleTheme } = useTheme();
    const { pieceStyle, setPieceStyle, gameMode, setGameMode, playerColor, setPlayerColor, soundEnabled, setSoundEnabled, showMoves, setShowMoves, showPoints, setShowPoints, difficulty, setDifficulty } = useGameSettings();

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
                    value={gameMode === "two"}
                    onValueChange={(val) => setGameMode(val ? "two" : "single")}
                    trackColor={{ false: "#767577", true: "#2e7d32" }}
                    thumbColor={gameMode === "two" ? "#ffffff" : "#f4f3f4"}
                />
            </View>

            {/* SOUND TOGGLE */}
            <View style={styles.toggleRow}>
                <Text style={[styles.toggleLabel, isDark && styles.darkText]}>Sound</Text>
                <Switch
                    value={soundEnabled}
                    onValueChange={setSoundEnabled}
                    trackColor={{ false: "#767577", true: "#2e7d32" }}
                    thumbColor={soundEnabled ? "#ffffff" : "#f4f3f4"}
                />
            </View>

            {/* SHOW MOVES TOGGLE */}
            <View style={styles.toggleRow}>
                <Text style={[styles.toggleLabel, isDark && styles.darkText]}>Show Moves / Highlights</Text>
                <Switch
                    value={showMoves}
                    onValueChange={setShowMoves}
                    trackColor={{ false: "#767577", true: "#2e7d32" }}
                    thumbColor={showMoves ? "#ffffff" : "#f4f3f4"}
                />
            </View>

            {/* SHOW POINTS TOGGLE */}
            <View style={styles.toggleRow}>
                <Text style={[styles.toggleLabel, isDark && styles.darkText]}>Show Points</Text>
                <Switch
                    value={showPoints}
                    onValueChange={setShowPoints}
                    trackColor={{ false: "#767577", true: "#2e7d32" }}
                    thumbColor={showPoints ? "#ffffff" : "#f4f3f4"}
                />
            </View>

            {/* PLAYER COLOR (Only show if Single Player) */}
            {gameMode === "single" && (
                <>
                    <View style={styles.colorSelectorContainer}>
                        <Text style={[styles.sectionTitle, isDark && styles.darkText]}>Play as</Text>
                        <View style={styles.segmentedControl}>
                            <TouchableOpacity
                                style={[
                                    styles.segmentButton,
                                    playerColor === "w" && styles.segmentButtonActive,
                                    isDark && playerColor !== "w" && styles.optionDark
                                ]}
                                onPress={() => setPlayerColor("w")}
                            >
                                <Text style={[
                                    styles.segmentText,
                                    playerColor === "w" ? styles.segmentTextActive : (isDark && styles.darkText)
                                ]}>White</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.segmentButton,
                                    playerColor === "b" && styles.segmentButtonActive,
                                    isDark && playerColor !== "b" && styles.optionDark
                                ]}
                                onPress={() => setPlayerColor("b")}
                            >
                                <Text style={[
                                    styles.segmentText,
                                    playerColor === "b" ? styles.segmentTextActive : (isDark && styles.darkText)
                                ]}>Black</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.colorSelectorContainer}>
                        <Text style={[styles.sectionTitle, isDark && styles.darkText]}>Difficulty</Text>
                        <View style={styles.segmentedControl}>
                            {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
                                <TouchableOpacity
                                    key={diff}
                                    style={[
                                        styles.segmentButton,
                                        difficulty === diff && styles.segmentButtonActive,
                                        isDark && difficulty !== diff && styles.optionDark
                                    ]}
                                    onPress={() => setDifficulty(diff)}
                                >
                                    <Text style={[
                                        styles.segmentText,
                                        { fontSize: 14 },
                                        difficulty === diff ? styles.segmentTextActive : (isDark && styles.darkText)
                                    ]}>{diff.charAt(0).toUpperCase() + diff.slice(1)}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </>
            )}

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

    colorSelectorContainer: {
        width: "80%",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },

    segmentedControl: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#ddd",
        borderRadius: 8,
        overflow: "hidden",
    },

    segmentButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
    },

    segmentButtonActive: {
        backgroundColor: "#2e7d32",
    },

    segmentText: {
        fontSize: 16,
        fontWeight: "500",
    },

    segmentTextActive: {
        color: "white",
        fontWeight: "bold",
    },
});