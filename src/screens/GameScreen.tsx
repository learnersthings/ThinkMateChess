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
import { useThemeStyles } from "../theme/useThemeStyles";

import { getPieceSymbol } from "../game/pieces";

export default function GameScreen() {
    const { colors } = useThemeStyles();

    const [board, setBoard] = useState(getBoard());
    const [selected, setSelected] = useState<string | null>(null);
    const [legalMoves, setLegalMoves] = useState<string[]>([]);
    const [status, setStatus] = useState("");

    const [lastMove, setLastMove] = useState<{
        from: string;
        to: string;
    } | null>(null);

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
            setLastMove(null);
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

        // SWITCH PIECE
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

            setLastMove({
                from: selected,
                to: square,
            });
        } else {
            setStatus("Invalid move");
        }

        setSelected(null);
        setLegalMoves([]);
    };

    const isLightSquare = (i: number, j: number) => (i + j) % 2 === 0;

    const isLegalMove = (sq: string) => legalMoves.includes(sq);

    const isLastMove = (sq: string) =>
        lastMove?.from === sq || lastMove?.to === sq;

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors.customBackground },
            ]}
        >
            <Text style={[styles.title, { color: colors.text }]}>
                ♟ ThinkMate Chess
            </Text>

            <Text style={[styles.status, { color: colors.text }]}>
                {status}
            </Text>

            <View style={styles.board}>
                {board.map((row, i) => (
                    <View key={i} style={styles.row}>
                        {row.map((square, j) => {
                            const sq = toSquare(j, i);

                            const piece = square?.type
                                ? getPieceSymbol(`${square.color}${square.type}`)
                                : "";

                            const selectedStyle = selected === sq;
                            const legal = isLegalMove(sq);
                            const last = isLastMove(sq);

                            return (
                                <TouchableOpacity
                                    key={j}
                                    onPress={() => handlePress(i, j)}
                                    style={[
                                        styles.square,

                                        // THEME-BASED COLORS (NO HARD CODE)
                                        {
                                            backgroundColor: isLightSquare(i, j)
                                                ? colors.lightSquare
                                                : colors.darkSquare,
                                        },

                                        // selected
                                        selectedStyle && {
                                            borderWidth: 2,
                                            borderColor: colors.selected,
                                        },

                                        // last move
                                        last && {
                                            backgroundColor: colors.lastMove,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.piece,
                                            {
                                                color: isLightSquare(i, j)
                                                    ? colors.customLightText
                                                    : colors.customDarkText,
                                            },
                                        ]}
                                    >
                                        {piece}
                                    </Text>

                                    {/* LEGAL MOVE DOT */}
                                    {legal && !square?.type && (
                                        <View
                                            style={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: 5,
                                                backgroundColor:
                                                    colors.legalDot,
                                                position: "absolute",
                                            }}
                                        />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
    },

    status: {
        marginBottom: 10,
    },

    board: {
        marginTop: 10,
        borderRadius: 10,
        overflow: "hidden",
    },

    row: {
        flexDirection: "row",
    },

    square: {
        width: 44,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
    },

    piece: {
        fontSize: 28,
    },
});