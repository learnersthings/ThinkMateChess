import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type PieceStyle = "symbol" | "3d" | "crystal" | "glass" | "wooden" | "staunton" | "california" | "merida" | "uscf" | "cardinal";
export type Difficulty = "easy" | "medium" | "hard";

interface GameSettingsContextType {
    pieceStyle: PieceStyle;
    setPieceStyle: (style: PieceStyle) => void;
    gameMode: "single" | "two";
    setGameMode: (mode: "single" | "two") => void;
    playerColor: "w" | "b";
    setPlayerColor: (color: "w" | "b") => void;
    soundEnabled: boolean;
    setSoundEnabled: (enabled: boolean) => void;
    showMoves: boolean;
    setShowMoves: (show: boolean) => void;
    showPoints: boolean;
    setShowPoints: (show: boolean) => void;
    difficulty: Difficulty;
    setDifficulty: (diff: Difficulty) => void;
}

const GameSettingsContext = createContext<GameSettingsContextType | undefined>(
    undefined
);

export const GameSettingsProvider = ({ children }: { children: ReactNode }) => {
    const [pieceStyle, setPieceStyle] = useState<PieceStyle>("symbol");
    const [gameMode, setGameMode] = useState<"single" | "two">("two");
    const [playerColor, setPlayerColor] = useState<"w" | "b">("w");
    const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
    const [showMoves, setShowMoves] = useState<boolean>(true);
    const [showPoints, setShowPoints] = useState<boolean>(true);
    const [difficulty, setDifficulty] = useState<Difficulty>("easy");

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const storedPieceStyle = await AsyncStorage.getItem("pieceStyle");
                const storedGameMode = await AsyncStorage.getItem("gameMode");
                const storedPlayerColor = await AsyncStorage.getItem("playerColor");
                const storedSoundEnabled = await AsyncStorage.getItem("soundEnabled");
                const storedShowMoves = await AsyncStorage.getItem("showMoves");
                const storedShowPoints = await AsyncStorage.getItem("showPoints");
                const storedDifficulty = await AsyncStorage.getItem("difficulty");

                if (storedPieceStyle) setPieceStyle(storedPieceStyle as PieceStyle);
                if (storedGameMode === "single" || storedGameMode === "two") setGameMode(storedGameMode);
                if (storedPlayerColor === "w" || storedPlayerColor === "b") setPlayerColor(storedPlayerColor);
                if (storedSoundEnabled !== null) setSoundEnabled(storedSoundEnabled === "true");
                if (storedShowMoves !== null) setShowMoves(storedShowMoves === "true");
                if (storedShowPoints !== null) setShowPoints(storedShowPoints === "true");
                if (storedDifficulty === "easy" || storedDifficulty === "medium" || storedDifficulty === "hard") setDifficulty(storedDifficulty);
            } catch (error) {
                console.error("Error loading settings:", error);
            }
        };
        loadSettings();
    }, []);

    const savePieceStyle = async (style: PieceStyle) => {
        setPieceStyle(style);
        try {
            await AsyncStorage.setItem("pieceStyle", style);
        } catch (error) {
            console.error("Error saving pieceStyle:", error);
        }
    };

    const saveGameMode = async (mode: "single" | "two") => {
        setGameMode(mode);
        try {
            await AsyncStorage.setItem("gameMode", mode);
        } catch (error) {
            console.error("Error saving gameMode:", error);
        }
    };

    const savePlayerColor = async (color: "w" | "b") => {
        setPlayerColor(color);
        try {
            await AsyncStorage.setItem("playerColor", color);
        } catch (error) {
            console.error("Error saving playerColor:", error);
        }
    };

    const saveSoundEnabled = async (enabled: boolean) => {
        setSoundEnabled(enabled);
        try {
            await AsyncStorage.setItem("soundEnabled", enabled.toString());
        } catch (error) {
            console.error("Error saving soundEnabled:", error);
        }
    };

    const saveShowMoves = async (show: boolean) => {
        setShowMoves(show);
        try {
            await AsyncStorage.setItem("showMoves", show.toString());
        } catch (error) {
            console.error("Error saving showMoves:", error);
        }
    };

    const saveShowPoints = async (show: boolean) => {
        setShowPoints(show);
        try {
            await AsyncStorage.setItem("showPoints", show.toString());
        } catch (error) {
            console.error("Error saving showPoints:", error);
        }
    };

    const saveDifficulty = async (diff: Difficulty) => {
        setDifficulty(diff);
        try {
            await AsyncStorage.setItem("difficulty", diff);
        } catch (error) {
            console.error("Error saving difficulty:", error);
        }
    };

    return (
        <GameSettingsContext.Provider value={{ 
            pieceStyle, setPieceStyle: savePieceStyle, 
            gameMode, setGameMode: saveGameMode, 
            playerColor, setPlayerColor: savePlayerColor,
            soundEnabled, setSoundEnabled: saveSoundEnabled,
            showMoves, setShowMoves: saveShowMoves,
            showPoints, setShowPoints: saveShowPoints,
            difficulty, setDifficulty: saveDifficulty
        }}>
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
