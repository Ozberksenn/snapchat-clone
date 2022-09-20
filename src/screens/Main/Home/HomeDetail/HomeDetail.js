import { View, SafeAreaView, Text, Image, Alert } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./HomeDetail.style";
import Button from "../../../../components/Button/Button";
const HomeDetail = () => {
  const { userInfo } = useSelector((state) => state.user);
  const handleShare = () => {
    Alert.alert("Successfully", "Photo Successfully Shared");
  };
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
