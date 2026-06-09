import { Chess, Square } from "chess.js";

export const game = new Chess();

export function getBoard() {
    return game.board();
}

export function makeMove(from: Square, to: Square) {
    const move = game.move({ from, to });

    return {
        move,
        fen: game.fen(),
        isValid: !!move,
    };
}

export function getTurn() {
    return game.turn();
}

export function getLegalMoves(square: Square) {
    return game.moves({
        square,
        verbose: true,
    });
}

export function resetGame() {
    game.reset();
}

export function getFEN() {
    return game.fen();
}