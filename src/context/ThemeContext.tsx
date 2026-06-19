import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeType = "light" | "dark";

type ThemeContextType = {
    theme: ThemeType;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: any) => {
    const [theme, setTheme] = useState<ThemeType>("light");

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem("theme");
                if (storedTheme === "light" || storedTheme === "dark") {
                    setTheme(storedTheme);
                }
            } catch (error) {
                console.error("Error loading theme:", error);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        setTheme((prev) => {
            const newTheme = prev === "light" ? "dark" : "light";
            AsyncStorage.setItem("theme", newTheme).catch((error) => console.error("Error saving theme:", error));
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);