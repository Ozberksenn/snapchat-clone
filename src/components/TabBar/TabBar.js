import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./TabBar.style";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const TabBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.tabBarContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <AntDesign style={styles.icon} name="home" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Map")}>
        <FontAwesome5 style={styles.icon} name="map-signs" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <MaterialCommunityIcons style={styles.icon} name="face-woman-profile" />
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;
