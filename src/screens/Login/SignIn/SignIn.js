import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./SignIn.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
const SignIn = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <MaterialCommunityIcons style={styles.logo} name="snapchat" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Log Into Snapchat</Text>
        <Text style={styles.text}>EMAIL</Text>
        <Input placeholder="" />
        <Text style={styles.text}>PASSWORD</Text>
        <Input placeholder="" />
        <Button btnName="Log In" />
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.createAccount}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
