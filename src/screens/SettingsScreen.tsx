import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SettingsScreen() {
    const [mode, setMode] = useState<"single" | "two">("two");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <TouchableOpacity
                style={[
                    styles.option,
                    mode === "single" && styles.selected,
                ]}
                onPress={() => setMode("single")}
            >
                <Text>Single Player</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.option,
                    mode === "two" && styles.selected,
                ]}
                onPress={() => setMode("two")}
            >
                <Text>Two Player</Text>
            </TouchableOpacity>

            <Text style={styles.status}>
                Current Mode: {mode}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    option: {
        padding: 12,
        width: 200,
        marginVertical: 6,
        backgroundColor: "#ddd",
        alignItems: "center",
        borderRadius: 8,
    },
    selected: {
        backgroundColor: "#90caf9",
    },
    status: {
        marginTop: 20,
        fontSize: 16,
    },
});