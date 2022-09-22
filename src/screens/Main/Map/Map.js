import {
  View,
  Text,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import styles from "./Map.style";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Map() {
  // haritamızın bulunduğu sayfa.
  const [location, setLocation] = useState(null);
  const [localData, setLocalData] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const getLocal = async () => {
    // markera image verebilmek için localDatadan görseli çekiyoruz.
    const response = await AsyncStorage.getItem("userKey");
    const local = response ? JSON.parse(response) : null;
    setLocalData(local);
  };

  useEffect(() => {
    currentLocation();
    getLocal();
  }, []);

  const currentLocation = async () => {
    // Uygulama ilk render edildiğinde haritayı kullanabilmek için izin isteriz.
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("", "Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

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
                source={{ uri: localData?.profilUri }}
              />
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalText}>Close</Text>
              </View>
            </View>
          </Pressable>
        </SafeAreaView>
      </Modal>
      <MapView style={styles.map} maxZoomLevel={20}>
        {location ? (
          <Pressable onPress={() => setModalVisible(true)}>
            <Marker
              coordinate={{
                latitude: location.coords.latitude, // coords = bulunduğumuz kordinatları alır.
                longitude: location.coords.longitude,
              }}
            >
              <Image
                style={{ width: 40, height: 40, borderRadius: 50 }}
                source={{
                  uri: localData.profilUri,
                }}
              />
            </Marker>
          </Pressable>
        ) : null}
      </MapView>
    </View>
  );
}
