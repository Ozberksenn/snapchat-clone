import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "./EditProfile.style";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import { MaterialIcons } from "@expo/vector-icons";
const EditProfile = () => {
  return (
    <SafeAreaView style={styles.editContainer}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>You Can Update Profil Info</Text>
        <TouchableOpacity style={styles.updateImage}>
          <Image />
          <MaterialIcons name="camera-enhance" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.text}>Mail</Text>
        <Input />
        <Text style={styles.text}>User Name</Text>
        <Input />
        <Text style={styles.text}>Password</Text>
        <Input />
        <Button btnName="Save" />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
