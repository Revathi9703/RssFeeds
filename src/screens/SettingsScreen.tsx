import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setTemperatureUnit, setNewsFrequency } from "../redux/slices/settingSlice";
import { RootState } from "../redux/store";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { temperatureUnit, newsFrequency } = useSelector((state: RootState) => state.settings);

  // Handle Done Button Click
  const handleDone = () => {
    navigation.goBack(); // Navigate back after updating settings
  };

  return (
    <View style={styles.container}>
      {/* Temperature Unit Toggle */}
      <View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Temperature Unit</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.button, temperatureUnit === "Celsius" && styles.activeButton]}
            onPress={() => dispatch(setTemperatureUnit("Celsius"))}
          >
            <Text style={[styles.buttonText, temperatureUnit === "Celsius" && styles.activeText]}>°C</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, temperatureUnit === "Fahrenheit" && styles.activeButton]}
            onPress={() => dispatch(setTemperatureUnit("Fahrenheit"))}
          >
            <Text style={[styles.buttonText, temperatureUnit === "Fahrenheit" && styles.activeText]}>°F</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* News Update Frequency Toggle */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>News Update Frequency</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.button, newsFrequency === "Hourly" && styles.activeButton]}
            onPress={() => dispatch(setNewsFrequency("Hourly"))}
          >
            <Text style={[styles.buttonText, newsFrequency === "Hourly" && styles.activeText]}>Hour</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, newsFrequency === "Daily" && styles.activeButton]}
            onPress={() => dispatch(setNewsFrequency("Daily"))}
          >
            <Text style={[styles.buttonText, newsFrequency === "Daily" && styles.activeText]}>Daily</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>

      {/* Done Button */}
      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>✔ Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#555",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  activeButton: {
    backgroundColor: "#0396A6",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    width:40,
    alignSelf:"center"
  },
  activeText: {
    color: "#fff",
    width:40
  },
  doneButton: {
    backgroundColor: "#0396A6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    
  },
  doneButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    width:80,
  },
});

export default SettingsScreen;
