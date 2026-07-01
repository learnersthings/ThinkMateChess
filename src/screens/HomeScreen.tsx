import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useThemeStyles } from "../theme/useThemeStyles";
import { useGameSettings } from "../context/GameSettingsContext";
import { game, isGameOver, resetGame } from "../game/engine";

export default function HomeScreen({ navigation }: any) {
    const { colors } = useThemeStyles();
    const { gameMode, playerColor } = useGameSettings();

    const [modalVisible, setModalVisible] = useState(false);
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [hasOngoingGame, setHasOngoingGame] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setHasOngoingGame(game.history().length > 0 && !isGameOver());
        }, [])
    );

    const handlePlayClick = () => {
        setModalVisible(true);
        setName1("");
        setName2("");
    };

    const handleResumeGame = () => {
        let whiteName = "";
        let blackName = "";

        if (gameMode === "single") {
            if (playerColor === "w") {
                whiteName = name1;
                blackName = "Computer";
            } else {
                blackName = name1;
                whiteName = "Computer";
            }
        } else {
            whiteName = name1;
            blackName = name2;
        }

        navigation.navigate("Game", { whiteName, blackName });
    };

    const startGame = () => {
        resetGame();
        setModalVisible(false);
        let whiteName = "";
        let blackName = "";

        if (gameMode === "single") {
            if (playerColor === "w") {
                whiteName = name1;
                blackName = "Computer";
            } else {
                blackName = name1;
                whiteName = "Computer";
            }
        } else {
            whiteName = name1;
            blackName = name2;
        }

        navigation.navigate("Game", { whiteName, blackName });
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors.background },
            ]}
        >
            <Text
                style={[
                    styles.title,
                    { color: colors.text },
                ]}
            >
                ♟ ThinkMate Chess
            </Text>

            {hasOngoingGame ? (
                <>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: colors.accent, marginBottom: 15 },
                        ]}
                        onPress={handleResumeGame}
                    >
                        <Text style={styles.buttonText}>Resume Game</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: colors.accent, marginBottom: 15 },
                        ]}
                        onPress={handlePlayClick}
                    >
                        <Text style={styles.buttonText}>New Game</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: colors.accent, marginBottom: 15 },
                    ]}
                    onPress={handlePlayClick}
                >
                    <Text style={styles.buttonText}>Play</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: colors.accent },
                ]}
                onPress={() => navigation.navigate("Rules")}
            >
                <Text style={styles.buttonText}>Chess Rules</Text>
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalBox, { backgroundColor: colors.customBackground }]}>
                        <Text style={[styles.modalTitle, { color: colors.text }]}>Enter Player Names</Text>

                        {gameMode === "single" ? (
                            <TextInput
                                style={[styles.input, { color: colors.text, borderColor: colors.text }]}
                                placeholder="Your Name (Optional)"
                                placeholderTextColor="#888"
                                value={name1}
                                onChangeText={setName1}
                            />
                        ) : (
                            <>
                                <TextInput
                                    style={[styles.input, { color: colors.text, borderColor: colors.text }]}
                                    placeholder="Player 1 (White) Name"
                                    placeholderTextColor="#888"
                                    value={name1}
                                    onChangeText={setName1}
                                />
                                <TextInput
                                    style={[styles.input, { color: colors.text, borderColor: colors.text }]}
                                    placeholder="Player 2 (Black) Name"
                                    placeholderTextColor="#888"
                                    value={name2}
                                    onChangeText={setName2}
                                />
                            </>
                        )}

                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={startGame} style={[styles.startButton, { backgroundColor: colors.accent }]}>
                                <Text style={styles.startButtonText}>Start Game</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        padding: 14,
        borderRadius: 10,
        width: 150,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: "80%",
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 10,
    },
    cancelButton: {
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
        alignItems: "center",
        backgroundColor: "#ccc",
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    startButton: {
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginLeft: 10,
        alignItems: "center",
    },
    startButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
});