import { Square } from "chess.js";

// all valid chess squares
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];

export function toSquare(file: number, rank: number): Square {
    const square = (files[file] + ranks[7 - rank]) as Square;
    return square;
}