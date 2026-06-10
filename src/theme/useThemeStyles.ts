import { useTheme } from "../context/ThemeContext";

export function useThemeStyles() {
    const { theme } = useTheme();

    const isDark = theme === "dark";

    return {
        theme,
        isDark,

        colors: {
            background: isDark ? "#121212" : "#ffffff",
            text: isDark ? "#ffffff" : "#000000",

            customBackground: isDark ? "#444444" : "#949494",
            customLightText: "#000000",
            customDarkText: "#ffffff",

            // chess board colors (NEW)
            lightSquare: isDark ? "#ffffff" : "#ffffff",
            darkSquare: isDark ? "#000000" : "#000000",

            accent: "#2e7d32",

            selected: "#4aa3ff",
            lastMove: "rgba(255, 215, 0, 0.25)",
            legalDot: "rgba(36, 91, 221, 0.88)",
        },
    };
}