import { SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./Theme.style";

const Theme = () => {
  return (
    <SafeAreaView style={styles.themeContainer}>
      <TouchableOpacity>
        <MaterialCommunityIcons
          name="ceiling-light"
          style={styles.Toggleicon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Theme;
