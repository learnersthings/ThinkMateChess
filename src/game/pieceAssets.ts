import { PieceStyle } from "../context/GameSettingsContext";

// In React Native, local images must be statically required.
const ASSETS: Record<Exclude<PieceStyle, "symbol">, Record<string, any>> = {
    "3d": {
        "wp": require("../../assets/pieces/3d/wp.png"),
        "wn": require("../../assets/pieces/3d/wn.png"),
        "wb": require("../../assets/pieces/3d/wb.png"),
        "wr": require("../../assets/pieces/3d/wr.png"),
        "wq": require("../../assets/pieces/3d/wq.png"),
        "wk": require("../../assets/pieces/3d/wk.png"),
        "bp": require("../../assets/pieces/3d/bp.png"),
        "bn": require("../../assets/pieces/3d/bn.png"),
        "bb": require("../../assets/pieces/3d/bb.png"),
        "br": require("../../assets/pieces/3d/br.png"),
        "bq": require("../../assets/pieces/3d/bq.png"),
        "bk": require("../../assets/pieces/3d/bk.png"),
    },
    "crystal": {
        "wp": require("../../assets/pieces/crystal/wp.png"),
        "wn": require("../../assets/pieces/crystal/wn.png"),
        "wb": require("../../assets/pieces/crystal/wb.png"),
        "wr": require("../../assets/pieces/crystal/wr.png"),
        "wq": require("../../assets/pieces/crystal/wq.png"),
        "wk": require("../../assets/pieces/crystal/wk.png"),
        "bp": require("../../assets/pieces/crystal/bp.png"),
        "bn": require("../../assets/pieces/crystal/bn.png"),
        "bb": require("../../assets/pieces/crystal/bb.png"),
        "br": require("../../assets/pieces/crystal/br.png"),
        "bq": require("../../assets/pieces/crystal/bq.png"),
        "bk": require("../../assets/pieces/crystal/bk.png"),
    },
    "glass": {
        "wp": require("../../assets/pieces/glass/wp.png"),
        "wn": require("../../assets/pieces/glass/wn.png"),
        "wb": require("../../assets/pieces/glass/wb.png"),
        "wr": require("../../assets/pieces/glass/wr.png"),
        "wq": require("../../assets/pieces/glass/wq.png"),
        "wk": require("../../assets/pieces/glass/wk.png"),
        "bp": require("../../assets/pieces/glass/bp.png"),
        "bn": require("../../assets/pieces/glass/bn.png"),
        "bb": require("../../assets/pieces/glass/bb.png"),
        "br": require("../../assets/pieces/glass/br.png"),
        "bq": require("../../assets/pieces/glass/bq.png"),
        "bk": require("../../assets/pieces/glass/bk.png"),
    }
};

export const getPieceAssetSource = (color: string, type: string, style: PieceStyle) => {
    if (style === "symbol") {
        return null;
    }

    const key = `${color}${type}`.toLowerCase();
    
    return ASSETS[style][key] || null;
};
