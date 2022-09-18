import { View, Text, TextInput } from "react-native";
import React from "react";
import styles from "./Input.style";
const Input = ({ placeholder, onChangeText }) => {
  return (
    <View style={styles.InputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

export default Input;
