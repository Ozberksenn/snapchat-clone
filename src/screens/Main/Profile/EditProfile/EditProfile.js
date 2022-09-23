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
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import uploadImageAsync from "../../../../hooks/uploadImageAsync";
import { auth } from "../../../../../config";
import { updateEmail, updatePassword } from "firebase/auth";
import { db } from "../../../../../config";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../../redux/userSlice";
const EditProfile = () => {
  const dispatch = useDispatch();
  const { activeTheme } = useSelector((state) => state.theme);
  const [profilImage, setProfilImage] = useState();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [localData, setLocalData] = useState();

  // We are pulling the information again from the lcoal data. To give the input defaulValue.
  useEffect(() => {
    getLocal();
  }, []);
  const getLocal = async () => {
    const response = await AsyncStorage.getItem("userKey");
    const local = response ? JSON.parse(response) : null;
    setLocalData(local);
  };

  const handleImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      aspect: [4, 3],
      allowsEditing: true,
    });
    if (!result.cancelled) {
      const editPhotoUrl = await uploadImageAsync(result.uri);
      setProfilImage(editPhotoUrl);
      updatefireStorage(editPhotoUrl);
    }
  };
  const updatefireStorage = async (editPhotoUrl) => {
    const profileUrl = doc(db, "users", localData?.uid);
    await updateDoc(profileUrl, {
      profilUri: editPhotoUrl,
    });
  };

  const handleSaveButton = async () => {
    if (email && password && userName) {
      updateEmail(auth.currentUser, email)
        .then(() => {
          updatePassword(auth.currentUser, password).then(async () => {
            {
              const userUpdate = doc(db, "users", localData?.uid);
              await updateDoc(userUpdate, {
                email: email,
                password: password,
                userName: userName,
              });
            }
          });
          dispatch(logOut({}));
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <SafeAreaView
      style={[styles.editContainer, { backgroundColor: activeTheme.bgColor }]}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.title, { color: activeTheme.color }]}>
          You Can Update Profil Info
        </Text>
        <TouchableOpacity onPress={handleImage} style={styles.updateImage}>
          {profilImage ? (
            <Image style={styles.photo} source={{ uri: profilImage }} />
          ) : (
            <MaterialIcons
              style={[styles.photoIcon, { color: activeTheme.color }]}
              name="camera-enhance"
            />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.text}>Mail</Text>
        <Input
          defaultValue={localData?.email}
          onChangeText={(value) => setEmail(value)}
        />
        <Text style={styles.text}>User Name</Text>
        <Input
          defaultValue={localData?.userName}
          onChangeText={(value) => setUserName(value)}
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
