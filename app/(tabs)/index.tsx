import { initDatabase } from "@/lib/database";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    try {
      initDatabase();
    } catch (error) {
      Alert.alert("Database Error", "Failed to initialize database");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📝</Text>
      <Text style={styles.title}>Mini Task App</Text>
      <Text style={styles.subtitle}>
        Welcome! Tap the Tasks tab to manage your tasks, or press the button
        below.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/(tabs)/tasks/tasks")}
      >
        <Text style={styles.buttonText}>Open Tasks</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: {
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#111",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
