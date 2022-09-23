import { View, SafeAreaView, Text, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./HomeDetail.style";
import Button from "../../../../components/Button/Button";
import { useSelector } from "react-redux";
import { db } from "../../../../../config";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import uploadImageAsync from "../../../../hooks/uploadImageAsync";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
const HomeDetail = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const { userInfo } = useSelector((state) => state.user);
  const [localData, setLocalData] = useState();

  useEffect(() => {
    getLocal();
  }, []);

  const getLocal = async () => {
    const response = await AsyncStorage.getItem("userKey");
    const local = response ? JSON.parse(response) : null;
    setLocalData(local);
  };

  const handleShare = async () => {
    const baseImage = await uploadImageAsync(userInfo.image);
    const userResponse = await doc(db, "users", localData?.uid);
    let postsResponse = await getDoc(userResponse);
    postsResponse = await postsResponse.data().posts;

    if (baseImage) {
      const postAdded = doc(db, "users", localData?.uid);
      if (postsResponse) {
        await updateDoc(postAdded, {
          posts: [
            ...postsResponse,
            {
              postUrl: baseImage,
            },
          ],
        }).then(
          () =>
            navigation.navigate("BottomTab") & toast.show("Has Been Shared...")
        );
      } else if (!postsResponse) {
        await updateDoc(postAdded, {
          posts: [
            {
              postUrl: baseImage,
            },
          ],
        }).then(
          () =>
            navigation.navigate("BottomTab") & toast.show("Has Been Shared...")
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.homeDetailContainer}>
      <View>
        <Text style={styles.title}>You Can Share This Photo Right Now</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: userInfo.image }} />
        </View>
        <Button onPress={handleShare} btnName="SHARE" />
      </View>
    </SafeAreaView>
  );
};

export default HomeDetail;
