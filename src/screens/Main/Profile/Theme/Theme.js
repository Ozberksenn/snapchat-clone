import { SafeAreaView, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./Theme.style";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../../redux/themeSlice";
import { FontAwesome } from "@expo/vector-icons";
const Theme = () => {
  const { activeTheme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const handleIcon = () => {
    dispatch(toggleTheme());
  };
  return (
    <SafeAreaView
      style={[styles.themeContainer, { backgroundColor: activeTheme.bgColor }]}
    >
      <TouchableOpacity onPress={handleIcon}>
        <MaterialCommunityIcons
          name="ceiling-light"
          style={[styles.Toggleicon, { color: activeTheme.lamb }]}
        />
      </TouchableOpacity>
      <View>
        <FontAwesome
          style={[styles.snapIcon, { color: activeTheme.snapIcon }]}
          name="snapchat-ghost"
        />
      </View>
    </SafeAreaView>
  );
};

export default Theme;
