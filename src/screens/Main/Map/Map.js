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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../config";

export default function Map() {
  // haritamızın bulunduğu sayfa.
  const [data, setData] = useState(null);
  const [myLocation, setMyLocation] = useState(null);
  const [localData, setLocalData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getLocations = async () => {
    const response = await AsyncStorage.getItem("userKey");
    const local = response ? JSON.parse(response) : null;
    setLocalData(local);
    // Uygulama ilk render edildiğinde haritayı kullanabilmek için izin isteriz.
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("", "Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log("location:", location);
    setMyLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (location) {
      const addLocal = doc(db, "users", local?.uid);
      console.log("firebaseye yazıyorum.", addLocal);
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
      // const getDoc = doc(db, "users", localData?.uid);
      // const check = await getDoc(getDoc);
      // console.log("ben asdasdasdsd", check.data().currentLocation);
      // setLocation(location);
    }
    // setGetLocation(check.data().currentLocationn);
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
