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

export default function GameScreen() {
    const [board, setBoard] = useState(getBoard());
    const [selected, setSelected] = useState<string | null>(null);
    const [legalMoves, setLegalMoves] = useState<string[]>([]);
    const [status, setStatus] = useState("");

    const refresh = () => {
        setBoard([...getBoard()]);
    };

    // reset when screen opens
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

        // SELECT
        if (!selected) {
            if (!piece) return;
            if (piece.color !== turn) return;

            setSelected(square);
            setLegalMoves(getLegalMoves(square).map((m) => m.to));
            setStatus(`Selected ${square}`);
            return;
        }

        // UNSELECT
        if (selected === square) {
            setSelected(null);
            setLegalMoves([]);
            return;
        }

        // SWITCH SELECTION
        if (piece && piece.color === turn) {
            setSelected(square);
            setLegalMoves(getLegalMoves(square).map((m) => m.to));
            setStatus(`Selected ${square}`);
            return;
        }

        // MOVE
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
        <View style={styles.container}>
            <Text style={styles.title}>♟ ThinkMate Chess</Text>
            <Text style={styles.status}>{status}</Text>

            {board.map((row, i) => (
                <View key={i} style={styles.row}>
                    {row.map((square, j) => {
                        const sq = toSquare(j, i);

                        const piece = square?.type
                            ? `${square.color}${square.type}`
                            : "";

                        const isSelected = selected === sq;
                        const isLegal = legalMoves.includes(sq);

                        return (
                            <TouchableOpacity
                                key={j}
                                style={[
                                    styles.square,
                                    (i + j) % 2 === 0 ? styles.light : styles.dark,
                                    isSelected && styles.selected,
                                    isLegal && styles.legal,
                                ]}
                                onPress={() => handlePress(i, j)}
                            >
                                <Text style={styles.piece}>{piece}</Text>
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
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
    },
    status: {
        marginBottom: 10,
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
    light: {
        backgroundColor: "#f0d9b5",
    },
    dark: {
        backgroundColor: "#b58863",
    },
    selected: {
        borderWidth: 2,
        borderColor: "blue",
    },
    legal: {
        backgroundColor: "rgba(0,255,0,0.25)",
    },
    piece: {
        fontSize: 18,
    },
});