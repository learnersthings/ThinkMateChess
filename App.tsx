import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { getBoard, makeMove, getTurn, getLegalMoves } from "./src/game/engine";
import { toSquare } from "./src/game/square";

export default function App() {
  const [board, setBoard] = useState(getBoard());
  const [selected, setSelected] = useState<string | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  const refresh = () => {
    setBoard([...getBoard()]);
  };

  const handlePress = (row: number, col: number) => {
    const square = toSquare(col, row);
    const piece = board[row][col];
    const turn = getTurn();

    // 🧠 No selection yet → select piece
    if (!selected) {
      if (!piece) return;

      if (piece.color !== turn) {
        setStatus("Not your turn");
        return;
      }

      setSelected(square);

      const moves = getLegalMoves(square).map((m) => m.to);
      setLegalMoves(moves);

      setStatus(`Selected ${square}`);
      return;
    }

    // 🧠 Tap same square → unselect
    if (selected === square) {
      setSelected(null);
      setLegalMoves([]);
      setStatus("");
      return;
    }

    // 🧠 Switch selection to another piece
    if (piece && piece.color === turn) {
      setSelected(square);

      const moves = getLegalMoves(square).map((m) => m.to);
      setLegalMoves(moves);

      setStatus(`Selected ${square}`);
      return;
    }

    // 🧠 Try move
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

  const isLegalTarget = (square: string) => {
    return legalMoves.includes(square);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ThinkMate Chess</Text>
      <Text style={styles.status}>{status}</Text>

      {board.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((square, j) => {
            const sq = toSquare(j, i);

            const piece = square?.type
              ? `${square.color}${square.type}`
              : "";

            const isSelected = selected === sq;
            const isTarget = isLegalTarget(sq);

            return (
              <TouchableOpacity
                key={j}
                style={[
                  styles.square,
                  (i + j) % 2 === 0 ? styles.light : styles.dark,
                  isSelected && styles.selected,
                  isTarget && styles.legalMove,
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

  legalMove: {
    backgroundColor: "rgba(0,255,0,0.25)",
  },

  piece: {
    fontSize: 18,
  },
});