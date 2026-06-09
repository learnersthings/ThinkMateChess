import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useThemeStyles } from "../theme/useThemeStyles";

export default function HomeScreen({ navigation }: any) {
    const { colors } = useThemeStyles();

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors.background },
            ]}
        >
            <Text
                style={[
                    styles.title,
                    { color: colors.text },
                ]}
            >
                ♟ ThinkMate Chess
            </Text>

            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: colors.accent },
                ]}
                onPress={() => navigation.navigate("Game")}
            >
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
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
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
    },

    button: {
        padding: 14,
        borderRadius: 10,
    },

    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});