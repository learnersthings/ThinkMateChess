import { useTheme } from "../context/ThemeContext";
import { PieceStyle } from "../context/GameSettingsContext";

export function useThemeStyles() {
    const { theme } = useTheme();

    const isDark = theme === "dark";

    const getBoardColors = (pieceStyle: PieceStyle) => {
        switch (pieceStyle) {
            case "3d":
                return { lightSquare: "#f0d9b5", darkSquare: "#b58863" }; // Wood theme for 3D
            case "crystal":
                return { lightSquare: "#e0f7fa", darkSquare: "#00838f" }; // Ice theme for crystal
            case "glass":
                return { lightSquare: "#e0e0e0", darkSquare: "#616161" }; // Sleek gray for glass
            case "wooden":
                return { lightSquare: "#f0d9b5", darkSquare: "#b58863" };
            case "staunton":
                return { lightSquare: "#e9edcc", darkSquare: "#779556" };
            case "california":
                return { lightSquare: "#e0c294", darkSquare: "#86a666" };
            case "merida":
                return { lightSquare: "#dcdcdc", darkSquare: "#949494" };
            case "uscf":
                return { lightSquare: "#c8d8e4", darkSquare: "#2b5876" };
            case "cardinal":
                return { lightSquare: "#f4dbce", darkSquare: "#b84b4b" };
            case "symbol":
            default:
                return {
                    lightSquare: isDark ? "#ffffff" : "#ffffff",
                    darkSquare: isDark ? "#000000" : "#000000"
                };
        }
    };

    return {
        theme,
        isDark,
        getBoardColors,
        colors: {
            background: isDark ? "#121212" : "#ffffff",
            text: isDark ? "#ffffff" : "#000000",

            customBackground: "#2D3909", // A rich dark slate that looks premium in both modes
            customBackgroundText: "#FFFFFF",
            customLightText: "#000000",
            customDarkText: "#ffffff",

            // default fallback colors
            lightSquare: isDark ? "#ffffff" : "#ffffff",
            darkSquare: isDark ? "#000000" : "#000000",

            accent: "#2e7d32",

            selected: "#4aa3ff",
            lastMove: "rgba(255, 215, 0, 0.25)",
            legalDot: "rgba(36, 91, 221, 0.88)",
        },
    };
}