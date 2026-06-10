import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import {
    getBoard,
    makeMove,
    getTurn,
    getLegalMoves,
    resetGame,
    getCapturedPieces,
    isPromotionMove,
    isCheck,
    isGameOver,
    getGameOverReason,
    getKingSquare,
    makeComputerMove,
    undoMove,
} from "../game/engine";

import { toSquare } from "../game/square";
import { useThemeStyles } from "../theme/useThemeStyles";

import { getPieceSymbol } from "../game/pieces";
import { useGameSettings } from "../context/GameSettingsContext";
import { getPieceAssetSource } from "../game/pieceAssets";

export default function GameScreen() {
    const { colors, getBoardColors } = useThemeStyles();
    const { pieceStyle, gameMode, playerColor } = useGameSettings();
    const boardColors = getBoardColors(pieceStyle);

    const [board, setBoard] = useState(getBoard());
    const [selected, setSelected] = useState<string | null>(null);
    const [legalMoves, setLegalMoves] = useState<string[]>([]);
    const [status, setStatus] = useState("White's Turn");
    const [promotionData, setPromotionData] = useState<{from: string, to: string} | null>(null);
    const [checkSquare, setCheckSquare] = useState<string | null>(null);
    const [gameOverText, setGameOverText] = useState<string | null>(null);

    const [lastMove, setLastMove] = useState<{
        from: string;
        to: string;
    } | null>(null);

    const refresh = () => {
        setBoard([...getBoard()]);
    };

    useFocusEffect(
        useCallback(() => {
            refresh();
            updateGameStatus();
        }, [])
    );

    const updateGameStatus = () => {
        const turn = getTurn();
        let currentStatus = turn === "w" ? "White's Turn" : "Black's Turn";

        if (isGameOver()) {
            const reason = getGameOverReason();
            const winner = reason === "Checkmate" ? (turn === 'w' ? "Black Wins!" : "White Wins!") : "";
            setGameOverText(`${reason}${winner ? `\n${winner}` : ''}`);
            currentStatus = "Game Over";
        } else {
            setGameOverText(null);
        }

        if (isCheck()) {
            setCheckSquare(getKingSquare(turn));
            if (!isGameOver()) {
                currentStatus = "Check!";
            }
        } else {
            setCheckSquare(null);
        }

        setStatus(currentStatus);
    };

    const handleReset = () => {
        resetGame();
        setBoard(getBoard());
        setSelected(null);
        setLegalMoves([]);
        setLastMove(null);
        setPromotionData(null);
        updateGameStatus();
    };

    const handleUndo = () => {
        if (gameMode !== "single") return;

        // Undo once
        undoMove();
        
        // If it's still not the player's turn (i.e. we undid the computer's move but now it's our previous move), undo again
        if (getTurn() !== playerColor) {
            undoMove();
        }

        refresh();
        setSelected(null);
        setLegalMoves([]);
        setLastMove(null);
        updateGameStatus();
    };

    // Computer Move Logic
    useEffect(() => {
        if (gameMode === "single" && !isGameOver()) {
            const turn = getTurn();
            if (turn !== playerColor) {
                // It's the computer's turn. Wait a small delay for realism.
                const timer = setTimeout(() => {
                    const result = makeComputerMove();
                    if (result && result.isValid) {
                        refresh();
                        setLastMove({
                            from: result.move.from,
                            to: result.move.to,
                        });
                        updateGameStatus();
                    }
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    }, [board, gameMode, playerColor]);

    const captured = getCapturedPieces();

    const renderCaptured = (color: "w" | "b") => {
        const pieces = captured[color];
        return (
            <View style={styles.capturedContainer}>
                {pieces.map((p, i) => {
                    if (pieceStyle === "symbol") {
                        return (
                            <Text key={i} style={[styles.capturedSymbol, { color: color === "w" ? "#dddddd" : "#222222" }]}>
                                {getPieceSymbol(color + p)}
                            </Text>
                        );
                    } else {
                        const src = getPieceAssetSource(color, p, pieceStyle);
                        return src ? (
                            <Image key={i} source={src} style={styles.capturedImage} resizeMode="contain" />
                        ) : null;
                    }
                })}
            </View>
        );
    };

    const executeMove = (from: string, to: string, promotion: string = "q") => {
        const result = makeMove(from, to, promotion);

        if (result.isValid) {
            refresh();
            setLastMove({
                from,
                to,
            });
            updateGameStatus();
        }

        // Unselect after a move
        setSelected(null);
        setLegalMoves([]);
        setPromotionData(null);
    };

    const handlePress = (row: number, col: number) => {
        const square = toSquare(col, row);
        const piece = board[row][col];
        const turn = getTurn();

        // SELECT
        if (!selected) {
            if (!piece) return;
            if (piece.color !== turn) return;
            if (gameMode === "single" && turn !== playerColor) return; // Prevent selection on computer's turn

            setSelected(square);
            setLegalMoves(getLegalMoves(square).map((m) => m.to));
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
            return;
        }

        // MOVE
        if (legalMoves.includes(square)) {
            if (isPromotionMove(selected, square)) {
                setPromotionData({ from: selected, to: square });
                return;
            }
            executeMove(selected, square);
        } else {
            setSelected(null);
            setLegalMoves([]);
        }
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


            {/* Status text positioned absolutely at the top so it doesn't affect the exact centering of the board */}
            <View style={{ position: "absolute", top: 50, width: "100%", alignItems: "center", zIndex: 10 }}>
                <Text style={[styles.status, { color: colors.text }]}>
                    {status}
                </Text>

                {gameMode === "single" && (
                    <TouchableOpacity onPress={handleUndo} style={styles.undoButton}>
                        <Text style={styles.undoText}>Undo</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* The board sits perfectly in the center of the container's flex: 1 space, shifted slightly up to optically balance with bottom tabs */}
            <View style={{ justifyContent: "center", width: "100%", alignItems: "center", transform: [{ translateY: -30 }] }}>
                {renderCaptured(playerColor === "b" ? "w" : "b")}

                <View style={[styles.board, playerColor === "b" && { transform: [{ rotate: "180deg" }] }]}>
                    {board.map((row, i) => (
                        <View key={i} style={styles.row}>
                                {row.map((square, j) => {
                                    const sq = toSquare(j, i);

                                    let pieceContent = null;
                                    if (square?.type) {
                                        if (pieceStyle === "symbol") {
                                            const symbol = getPieceSymbol(`${square.color}${square.type}`);
                                            pieceContent = (
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
                                                    {symbol}
                                                </Text>
                                            );
                                        } else {
                                            const assetSource = getPieceAssetSource(square.color, square.type, pieceStyle);
                                            if (assetSource) {
                                                pieceContent = (
                                                    <Image
                                                        source={assetSource}
                                                        style={styles.pieceImage}
                                                        resizeMode="contain"
                                                    />
                                                );
                                            }
                                        }
                                    }
                                    
                                    const legal = isLegalMove(sq);

                                    return (
                                        <TouchableOpacity
                                            key={j}
                                            style={[
                                                styles.square,

                                                // THEME-BASED COLORS (NO HARD CODE)
                                                {
                                                    backgroundColor: checkSquare === sq
                                                        ? "rgba(255, 0, 0, 0.7)"
                                                        : isLightSquare(i, j)
                                                            ? boardColors.lightSquare
                                                            : boardColors.darkSquare,
                                                },

                                                // selected
                                                selected === sq && {
                                                    borderWidth: 2,
                                                    borderColor: colors.selected,
                                                },

                                                // last move
                                                isLastMove(sq) && { backgroundColor: colors.lastMove },
                                            ]}
                                            onPress={() => handlePress(i, j)}
                                            activeOpacity={1}
                                        >
                                            <View style={playerColor === "b" ? { transform: [{ rotate: "180deg" }] } : {}}>
                                                {pieceContent}
                                            </View>

                                            {legal && (
                                                <View
                                                    style={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: 5,
                                                        backgroundColor: colors.legalDot,
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

                {renderCaptured(playerColor === "b" ? "b" : "w")}
            </View>

            {/* Game Over Modal / Overlay */}
            {gameOverText && (
                <View style={styles.gameOverContainer}>
                    <Text style={styles.gameOverText}>{gameOverText}</Text>
                    <TouchableOpacity style={styles.playAgainButton} onPress={handleReset}>
                        <Text style={styles.playAgainText}>Play Again</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Promotion Modal */}
            {promotionData && (
                <Modal transparent animationType="fade">
                    <View style={styles.promotionOverlay}>
                        <View style={[styles.promotionBox, { backgroundColor: colors.customBackground }]}>
                            <Text style={[styles.title, { color: colors.text, marginBottom: 20 }]}>Promote to</Text>
                            
                            <View style={styles.promotionOptions}>
                                {['q', 'r', 'b', 'n'].map(p => (
                                    <TouchableOpacity 
                                        key={p} 
                                        style={[styles.promotionOption, { backgroundColor: boardColors.lightSquare }]} 
                                        onPress={() => executeMove(promotionData.from, promotionData.to, p)}
                                    >
                                        {pieceStyle === "symbol" ? (
                                            <Text style={styles.piece}>{getPieceSymbol(getTurn() + p)}</Text>
                                        ) : (
                                            <Image 
                                                source={getPieceAssetSource(getTurn(), p, pieceStyle)} 
                                                style={styles.pieceImage} 
                                                resizeMode="contain" 
                                            />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity onPress={() => setPromotionData(null)} style={{ marginTop: 20 }}>
                                <Text style={{ color: 'red', fontSize: 16 }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
    },

    status: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },

    undoButton: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        backgroundColor: "#666",
        borderRadius: 20,
    },

    undoText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },

    board: {
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
        fontSize: 32,
    },

    pieceImage: {
        width: 40,
        height: 40,
    },

    capturedContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: 8 * 44,
        minHeight: 30,
        marginVertical: 10,
        paddingHorizontal: 5,
        alignItems: "center",
    },

    capturedSymbol: {
        fontSize: 30,
        marginRight: 4,
    },

    capturedImage: {
        width: 28,
        height: 28,
        marginRight: 4,
    },

    promotionOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    promotionBox: {
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    promotionOptions: {
        flexDirection: "row",
        gap: 10,
    },

    promotionOption: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },

    gameOverContainer: {
        position: "absolute",
        top: "40%",
        width: "80%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 30,
        borderRadius: 20,
        alignItems: "center",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },

    gameOverText: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },

    playAgainButton: {
        backgroundColor: "#4aa3ff",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
    },

    playAgainText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    }
});