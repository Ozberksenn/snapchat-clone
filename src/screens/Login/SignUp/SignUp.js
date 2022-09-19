import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "../SignUp/SignUp.style";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../config";
const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [passwordAgain, setPasswordAgain] = useState();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then()
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <MaterialCommunityIcons style={styles.logo} name="snapchat" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.text}>EMAIL</Text>
        <Input onChangeText={(value) => setEmail(value)} placeholder="" />
        <Text style={styles.text}>USER NAME</Text>
        <Input placeholder="" />
        <Text style={styles.text}>PASSWORD</Text>
        <Input onChangeText={(value) => setPassword(value)} placeholder="" />
        <Text style={styles.text}>PASSWORD AGAIN</Text>
        <Input placeholder="" />
        <Button onPress={handleSignUp} btnName="Sign Up" />
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.sigIn}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
