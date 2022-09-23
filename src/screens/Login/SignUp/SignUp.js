import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "../SignUp/SignUp.style";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../../config";
import { useToast } from "react-native-toast-notifications";
const SignUp = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [passwordAgain, setPasswordAgain] = useState();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        await setDoc(doc(db, "users", response.user.uid), {
          email: email,
          userName: userName,
          password: password,
          uid: response.user.uid,
        });
        navigation.navigate("SignIn");
        setEmail("");
        setUserName("");
        setPassword("");
        setPassword("");
        toast.show("congratulations user created :)");
      })
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
        <Input
          value={email}
          onChangeText={(value) => setEmail(value)}
          placeholder=""
        />
        <Text style={styles.text}>USER NAME</Text>
        <Input
          value={userName}
          onChangeText={(value) => setUserName(value)}
          placeholder=""
        />
        <Text style={styles.text}>PASSWORD</Text>
        <Input
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder=""
        />
        <Text style={styles.text}>PASSWORD AGAIN</Text>
        <Input
          value={passwordAgain}
          onChangeText={(value) => setPasswordAgain(value)}
          placeholder=""
        />
        <Button onPress={handleSignUp} btnName="Sign Up" />
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.sigIn}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
