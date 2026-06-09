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

            lightSquare: isDark ? "#2a2a2a" : "#f0d9b5",
            darkSquare: isDark ? "#444444" : "#b58863",

            accent: "#2e7d32",
        },
    };
}