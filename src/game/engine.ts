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

export function makeComputerMove() {
    const moves = game.moves({ verbose: true }) as any[];
    if (moves.length === 0) return null;

    const pieceValues: Record<string, number> = { q: 9, r: 5, b: 3, n: 3, p: 1 };
    
    let bestMove = null;
    let bestScore = -1;

    for (const move of moves) {
        let score = 0;
        if (move.captured) {
            score = pieceValues[move.captured] || 1;
        }
        
        if (move.promotion) {
            score += 8; 
        }

        score += Math.random() * 0.5;

        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    if (!bestMove) {
        bestMove = moves[Math.floor(Math.random() * moves.length)];
    }

    const result = game.move(bestMove.san);
    
    return {
        move: result,
        fen: game.fen(),
        isValid: !!result,
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

// undo
export function undoMove() {
    return game.undo();
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