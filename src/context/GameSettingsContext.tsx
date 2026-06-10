import React, { createContext, useState, useContext, ReactNode } from "react";

export type PieceStyle = "symbol" | "3d" | "crystal" | "glass";

interface GameSettingsContextType {
    pieceStyle: PieceStyle;
    setPieceStyle: (style: PieceStyle) => void;
}

const GameSettingsContext = createContext<GameSettingsContextType | undefined>(
    undefined
);

export const GameSettingsProvider = ({ children }: { children: ReactNode }) => {
    const [pieceStyle, setPieceStyle] = useState<PieceStyle>("symbol");

    return (
        <GameSettingsContext.Provider value={{ pieceStyle, setPieceStyle }}>
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
