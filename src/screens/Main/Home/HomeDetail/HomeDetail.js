import { View, SafeAreaView, Text, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./HomeDetail.style";
import Button from "../../../../components/Button/Button";
import { db } from "../../../../../config";
import { doc, updateDoc } from "firebase/firestore";
import uploadImageAsync from "../../../../hooks/uploadImageAsync";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeDetail = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [newImage, setNewImage] = useState("");
  const [localData, setLocalData] = useState();

  useEffect(() => {
    base();
    getLocal();
  }, [base]);
  const base = async () => {
    const baseImage = await uploadImageAsync(userInfo.image);
    setNewImage(baseImage);
  };

  const getLocal = async () => {
    const response = await AsyncStorage.getItem("userKey");
    const local = response ? JSON.parse(response) : null;
    setLocalData(local);
  };

  const handleShare = async () => {
    const postAdded = doc(db, "users", localData?.uid);
    await updateDoc(postAdded, {
      posts: [newImage],
    });
  };

  console.log("i am newImage : ", newImage);

  return (
    <SafeAreaView style={styles.homeDetailContainer}>
      <View>
        <Text style={styles.title}>You Can Share This Photo Right Now</Text>
        <Image style={styles.image} source={{ uri: userInfo.image }} />
        <Button onPress={handleShare} btnName="SHARE" />
      </View>
    </SafeAreaView>
  );
};

export default HomeDetail;
