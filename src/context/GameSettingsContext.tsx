import React, { createContext, useState, useContext, ReactNode } from "react";

export type PieceStyle = "symbol" | "3d" | "crystal" | "glass" | "wooden" | "staunton" | "california" | "merida" | "uscf" | "cardinal";

interface GameSettingsContextType {
    pieceStyle: PieceStyle;
    setPieceStyle: (style: PieceStyle) => void;
    gameMode: "single" | "two";
    setGameMode: (mode: "single" | "two") => void;
    playerColor: "w" | "b";
    setPlayerColor: (color: "w" | "b") => void;
}

const GameSettingsContext = createContext<GameSettingsContextType | undefined>(
    undefined
);

export const GameSettingsProvider = ({ children }: { children: ReactNode }) => {
    const [pieceStyle, setPieceStyle] = useState<PieceStyle>("symbol");
    const [gameMode, setGameMode] = useState<"single" | "two">("two");
    const [playerColor, setPlayerColor] = useState<"w" | "b">("w");

    return (
        <GameSettingsContext.Provider value={{ pieceStyle, setPieceStyle, gameMode, setGameMode, playerColor, setPlayerColor }}>
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
