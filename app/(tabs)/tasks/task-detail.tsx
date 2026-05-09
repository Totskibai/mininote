import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TaskDetailScreen() {
  const { id, title, description, status } = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    status: string;
  }>();

  const getStatusColor = (s: string) => {
    switch (s) {
      case "Ongoing":
        return "#e65100";
      case "Finished":
        return "#2e7d32";
      default:
        return "#1565c0";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.taskTitle}>{title}</Text>

        <View
          style={[styles.badge, { backgroundColor: getStatusColor(status) }]}
        >
          <Text style={styles.badgeText}>{status}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>Description</Text>
        <Text style={styles.description}>
          {description?.trim() ? description : "No description provided."}
        </Text>

        <Text style={styles.idText}>Task ID: {id}</Text>
      </View>

      <Pressable
        style={styles.editButton}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/tasks/edit-task",
            params: { id, title, description, status },
          })
        }
      >
        <Text style={styles.editButtonText}>✏️ Edit Task</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back to Tasks</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  taskTitle: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  divider: { height: 1, backgroundColor: "#ddd", marginBottom: 16 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#888",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 16,
  },
  idText: { fontSize: 12, color: "#aaa" },
  editButton: {
    backgroundColor: "#1565c0",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  editButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  backButton: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  backButtonText: { textAlign: "center", color: "#555", fontWeight: "600" },
});
