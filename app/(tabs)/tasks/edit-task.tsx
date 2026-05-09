import { updateTask } from "@/lib/database";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const statusOptions = ["Pending", "Ongoing", "Finished"];

export default function EditTaskScreen() {
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    status: string;
  }>();

  const [title, setTitle] = useState(params.title || "");
  const [description, setDescription] = useState(params.description || "");
  const [status, setStatus] = useState(params.status || "Pending");

  const handleUpdate = () => {
    try {
      if (!title.trim()) {
        throw new Error("Task title is required");
      }
      updateTask(Number(params.id), title.trim(), description.trim(), status);
      Alert.alert("Updated", "Task updated successfully.", [
        { text: "OK", onPress: () => router.replace("/(tabs)/tasks/tasks") },
      ]);
    } catch (error) {
      Alert.alert(
        "Update Error",
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task title *"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Task description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.statusRow}>
        {statusOptions.map((option) => (
          <Pressable
            key={option}
            style={[
              styles.statusBtn,
              status === option && styles.statusBtnActive,
            ]}
            onPress={() => setStatus(option)}
          >
            <Text
              style={[
                styles.statusBtnText,
                status === option && styles.statusBtnTextActive,
              ]}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update Task</Text>
      </Pressable>

      <Pressable style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 15,
    backgroundColor: "#fafafa",
  },
  textArea: { minHeight: 110, textAlignVertical: "top" },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  statusRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  statusBtn: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
  },
  statusBtnActive: { backgroundColor: "#111", borderColor: "#111" },
  statusBtnText: { color: "#333", fontWeight: "600" },
  statusBtnTextActive: { color: "#fff" },
  updateButton: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  updateButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  cancelButton: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cancelButtonText: { textAlign: "center", color: "#555", fontWeight: "600" },
});
