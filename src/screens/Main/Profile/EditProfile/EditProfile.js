import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./EditProfile.style";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
const EditProfile = () => {
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [localData, setLocalData] = useState();

  // lcoal datadan tekrardan bilgileri çekiyoruz. input defaulValue değerine vermek için.
  useEffect(() => {
    getLocal();
  }, []);
  const getLocal = async () => {
    const response = await AsyncStorage.getItem("userKey");
    const local = response ? JSON.parse(response) : null;
    setLocalData(local);
  };

  const handleSaveButton = () => {};

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
        <Input
          defaultValue={localData?.email}
          onChangeText={() => setEmail(value)}
        />
        <Text style={styles.text}>User Name</Text>
        <Input
          defaultValue={localData?.userName}
          onChangeText={() => setUserName(value)}
        />
        <Text style={styles.text}>Password</Text>
        <Input
          defaultValue={localData?.password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry
        />
        <Button onPress={handleSaveButton} btnName="Save" />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
