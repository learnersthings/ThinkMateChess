export function getPieceSymbol(piece: string): string {
    if (!piece) return "";

    const color = piece[0]; // w or b
    const type = piece[1];  // p, r, n, b, q, k

    const map: any = {
        wp: "♙",
        wr: "♖",
        wn: "♘",
        wb: "♗",
        wq: "♕",
        wk: "♔",

        bp: "♟",
        br: "♜",
        bn: "♞",
        bb: "♝",
        bq: "♛",
        bk: "♚",
    };

    return map[color + type] || "";
}