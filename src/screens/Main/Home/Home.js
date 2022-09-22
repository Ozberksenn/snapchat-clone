import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./Home.style";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../redux/userSlice";
import { Camera, CameraType } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(result.uri);
  };
  const handleCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(result.uri);
  };

  useEffect(() => {
    if (image) {
      dispatch(addUser({ image: image }));
      navigation.navigate("HomeDetail");
    }
  }, [pickImage]);

  useEffect(() => {
    // kamera izinleri için tetikleriz. Expodadan kameraya erişim izni verilmeli!
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [handleCamera]);

  if (hasPermission === null) {
  }
  if (hasPermission === false) {
    Alert.alert("Warning", "No Access To Camera");
  }

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text style={{ fontSize: 28, marginBottom: 50 }}>Share Photo</Text>
      <TouchableOpacity onPress={pickImage} style={styles.card}>
        <MaterialIcons name="photo-library" size={80} color="black" />
        <Text>Pick a Image For Upload</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCamera} style={styles.card}>
        <MaterialIcons name="camera-alt" size={80} color="black" />
        <Text>Take a Picture With Your Camera</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
