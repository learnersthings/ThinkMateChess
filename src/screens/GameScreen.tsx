import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import {
    getBoard,
    makeMove,
    getTurn,
    getLegalMoves,
    resetGame,
} from "../game/engine";

import { toSquare } from "../game/square";
import { useTheme } from "../context/ThemeContext";

export default function GameScreen() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [board, setBoard] = useState(getBoard());
    const [selected, setSelected] = useState<string | null>(null);
    const [legalMoves, setLegalMoves] = useState<string[]>([]);
    const [status, setStatus] = useState("");

    const refresh = () => {
        setBoard([...getBoard()]);
    };

    useFocusEffect(
        useCallback(() => {
            resetGame();
            setBoard([...getBoard()]);
            setSelected(null);
            setLegalMoves([]);
            setStatus("");
        }, [])
    );

    const handlePress = (row: number, col: number) => {
        const square = toSquare(col, row);
        const piece = board[row][col];
        const turn = getTurn();

        if (!selected) {
            if (!piece) return;
            if (piece.color !== turn) return;

            setSelected(square);
            setLegalMoves(getLegalMoves(square).map((m) => m.to));
            setStatus(`Selected ${square}`);
            return;
        }

        if (selected === square) {
            setSelected(null);
            setLegalMoves([]);
            return;
        }

        if (piece && piece.color === turn) {
            setSelected(square);
            setLegalMoves(getLegalMoves(square).map((m) => m.to));
            setStatus(`Selected ${square}`);
            return;
        }

        const result = makeMove(selected, square);

        if (result.isValid) {
            refresh();
            setStatus(`${selected} → ${square}`);
        } else {
            setStatus("Invalid move");
        }

        setSelected(null);
        setLegalMoves([]);
    };

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

            <Text style={[styles.status, isDark && styles.darkText]}>
                {status}
            </Text>

            {board.map((row, i) => (
                <View key={i} style={styles.row}>
                    {row.map((square, j) => {
                        const sq = toSquare(j, i);

                        const piece = square?.type
                            ? `${square.color}${square.type}`
                            : "";

                        const isSelected = selected === sq;
                        const isLegal = legalMoves.includes(sq);

                        const isLightSquare = (i + j) % 2 === 0;

                        return (
                            <TouchableOpacity
                                key={j}
                                style={[
                                    styles.square,
                                    isLightSquare
                                        ? isDark
                                            ? styles.darkLightSquare
                                            : styles.lightSquare
                                        : isDark
                                            ? styles.darkDarkSquare
                                            : styles.darkSquare,

                                    isSelected && styles.selected,
                                    isLegal && styles.legal,
                                ]}
                                onPress={() => handlePress(i, j)}
                            >
                                <Text style={styles.piece}>
                                    {piece}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ))}
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
        marginBottom: 8,
    },

    status: {
        marginBottom: 10,
    },

    darkText: {
        color: "#ffffff",
    },

    row: {
        flexDirection: "row",
    },

    square: {
        width: 45,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
    },

    lightSquare: {
        backgroundColor: "#f0d9b5",
    },

    darkSquare: {
        backgroundColor: "#b58863",
    },

    darkLightSquare: {
        backgroundColor: "#2a2a2a",
    },

    darkDarkSquare: {
        backgroundColor: "#444444",
    },

    selected: {
        borderWidth: 2,
        borderColor: "#2e7d32",
    },

    legal: {
        backgroundColor: "rgba(0,255,0,0.25)",
    },

    piece: {
        fontSize: 18,
    },
});