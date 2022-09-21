import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./Profile.style";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../../redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config";
import uploadImageAsync from "../../../hooks/uploadImageAsync";

const Profile = () => {
  const navigation = useNavigation();
  const { userInfo } = useSelector((state) => state.user);
  const [localData, setLocalData] = useState();
  const [profilImage, setProfilImage] = useState(); // profil picture state.
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut({}));
  };
  useEffect(() => {
    getLocal();
  }, []);
  const getLocal = async () => {
    const response = await AsyncStorage.getItem("userKey");
    const local = response ? JSON.parse(response) : null;
    const userDoc = await doc(db, "users", local.uid);
    const userRef = await getDoc(userDoc);
    setProfilImage(userRef.data().profilUri);
    setLocalData(userRef.data());
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      aspect: [4, 3],
      allowsEditing: true,
    });
    if (!result.cancelled) {
      const photoURL = await uploadImageAsync(result.uri);
      setProfilImage(photoURL);
      handleSubmitProfile(photoURL);
    }
  };
  const handleSubmitProfile = async (photoURL) => {
    const profilUpdate = doc(db, "users", localData?.uid);
    await updateDoc(profilUpdate, {
      profilUri: photoURL,
    });
  };

  return (
    <SafeAreaView style={styles.profileContainer}>
      <View style={styles.profilImageContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            style={styles.profilImage}
            source={{
              uri: profilImage,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>{localData?.userName}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Theme")}
        style={styles.btnContainer}
      >
        <Text style={styles.btnText}>Theme</Text>
        <MaterialIcons style={styles.icon} name="keyboard-arrow-right" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("EditProfile")}
        style={styles.btnContainer}
      >
        <Text style={styles.btnText}>Edit Profile</Text>
        <MaterialIcons style={styles.icon} name="keyboard-arrow-right" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogOut} style={styles.btnContainer}>
        <Text style={styles.btnText}>Log Out</Text>
        <MaterialIcons style={styles.icon} name="keyboard-arrow-right" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
