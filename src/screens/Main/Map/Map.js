import {
  View,
  Text,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import styles from "./Map.style";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../../config";

export default function Map() {
  // Map page
  const [data, setData] = useState(null);
  const [myLocation, setMyLocation] = useState(null);
  const [localData, setLocalData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getLocations = async () => {
    const response = await AsyncStorage.getItem("userKey");
    const local = response ? JSON.parse(response) : null;
    setLocalData(local);
    // When the app is first rendered, we ask for permission to use the map.
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("", "Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setMyLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (location) {
      const addLocal = doc(db, "users", local?.uid);
      await updateDoc(addLocal, {
        currentLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      }).then(async () => {
        const users = collection(db, "users");
        await getDocs(users)
          .then((e) => {
            console.log(e.docs.map((item) => item.data()));
            setData(e.docs.map((item) => item.data()));
          })
          .catch((error) => console.log("error", error));
      });
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <View>
      <Modal
        style={styles.modalView}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          <Pressable onPress={() => setModalVisible(false)}>
            <View style={styles.modal}>
              <Image
                style={styles.modalImage}
                source={{ uri: modalData?.profilUri }}
              />
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalText}>Close</Text>
              </View>
            </View>
          </Pressable>
        </SafeAreaView>
      </Modal>
      <MapView style={styles.map} maxZoomLevel={20}>
        {data &&
          data.map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  setModalVisible(true);
                  setModalData(item);
                }}
              >
                <Marker
                  coordinate={{
                    latitude: item?.currentLocation?.latitude,
                    longitude: item?.currentLocation?.longitude,
                  }}
                >
                  <Image
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                    source={{
                      uri: item?.profilUri,
                    }}
                  />
                </Marker>
              </Pressable>
            );
          })}
      </MapView>
    </View>
  );
}
