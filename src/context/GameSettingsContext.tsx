import React, { createContext, useState, useContext, ReactNode } from "react";

export type PieceStyle = "symbol" | "3d" | "crystal" | "glass" | "wooden" | "staunton" | "california" | "merida" | "uscf" | "cardinal";

interface GameSettingsContextType {
    pieceStyle: PieceStyle;
    setPieceStyle: (style: PieceStyle) => void;
    boardMode: "2d" | "3d";
    setBoardMode: (mode: "2d" | "3d") => void;
}

const GameSettingsContext = createContext<GameSettingsContextType | undefined>(
    undefined
);

export const GameSettingsProvider = ({ children }: { children: ReactNode }) => {
    const [pieceStyle, setPieceStyle] = useState<PieceStyle>("symbol");
    const [boardMode, setBoardMode] = useState<"2d" | "3d">("2d");

    return (
        <GameSettingsContext.Provider value={{ pieceStyle, setPieceStyle, boardMode, setBoardMode }}>
            {children}
        </GameSettingsContext.Provider>
    );
};

export const useGameSettings = () => {
    const context = useContext(GameSettingsContext);
    if (!context) {
        throw new Error(
            "useGameSettings must be used within a GameSettingsProvider"
        );
    }
    return context;
};
