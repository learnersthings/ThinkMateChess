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

export function makeMove(from: string, to: string, promotion: string = "q") {
    let move = null;
    try {
        move = game.move({
            from: toSq(from),
            to: toSq(to),
            promotion
        });
    } catch (e) {
        // Invalid move throws an error in modern chess.js
    }

    return {
        move,
        fen: game.fen(),
        isValid: !!move,
    };
}

export function isPromotionMove(from: string, to: string) {
    const moves = game.moves({ verbose: true }) as any[];
    return moves.some(m => m.from === from && m.to === to && m.promotion);
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

// Game State
export function isCheck() {
    return game.isCheck();
}

export function isGameOver() {
    return game.isGameOver();
}

export function getGameOverReason() {
    if (game.isCheckmate()) return "Checkmate";
    if (game.isStalemate()) return "Stalemate";
    if (game.isDraw()) return "Draw";
    return "";
}

export function getKingSquare(color: "w" | "b"): string | null {
    const board = game.board();
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j];
            if (piece && piece.type === 'k' && piece.color === color) {
                return piece.square;
            }
        }
    }
    return null;
}

// captured pieces
export function getCapturedPieces() {
    const history = game.history({ verbose: true }) as any[];
    const captured = {
        w: [] as string[], // White pieces that are dead
        b: [] as string[], // Black pieces that are dead
    };

    for (const move of history) {
        if (move.captured) {
            const capturedColor = move.color === 'w' ? 'b' : 'w';
            captured[capturedColor].push(move.captured);
        }
    }

    const order: Record<string, number> = { q: 1, r: 2, b: 3, n: 4, p: 5 };
    captured.w.sort((a, b) => order[a] - order[b]);
    captured.b.sort((a, b) => order[a] - order[b]);

    return captured;
}