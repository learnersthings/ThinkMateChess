import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>♟ ThinkMate Chess</Text>

            <TouchableOpacity
                style={styles.button}
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
        backgroundColor: "#2e7d32",
        padding: 14,
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
});