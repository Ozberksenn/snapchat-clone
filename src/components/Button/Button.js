import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./Button.style";
const Button = ({ onPress, btnName }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
      <Text style={styles.btnText}>{btnName}</Text>
    </TouchableOpacity>
  );
};

export default Button;
