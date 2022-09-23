import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./SignIn.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../../../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { setUser } from "../../../redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const userDoc = doc(db, "users", res.user.uid);
        const userRef = await getDoc(userDoc);
        dispatch(setUser(userRef.data()));
        AsyncStorage.setItem("userKey", JSON.stringify(userRef.data()));
      })
      .catch((e) => console.log(e));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <MaterialCommunityIcons style={styles.logo} name="snapchat" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Log Into Snapchat</Text>
        <Text style={styles.text}>EMAIL</Text>
        <Input onChangeText={(value) => setEmail(value)} placeholder="" />
        <Text style={styles.text}>PASSWORD</Text>
        <Input onChangeText={(value) => setPassword(value)} placeholder="" />
        <Button onPress={handleLogIn} btnName="Log In" />
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.createAccount}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
