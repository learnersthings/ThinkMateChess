import { Chess, Square } from "chess.js";

export const game = new Chess();

// internal safe converter
function toSq(square: string): Square {
    return square as Square;
}

// board
export function getBoard() {
    return game.board();
}

// move (UI sends strings only)
export function makeMove(from: string, to: string) {
    const move = game.move({
        from: toSq(from),
        to: toSq(to),
    });

    return {
        move,
        fen: game.fen(),
        isValid: !!move,
    };
}

// turn
export function getTurn() {
    return game.turn();
}

// legal moves
export function getLegalMoves(square: string) {
    return game.moves({
        square: toSq(square),
        verbose: true,
    });
}

// reset
export function resetGame() {
    game.reset();
}

// fen
export function getFEN() {
    return game.fen();
}