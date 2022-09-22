import { View, Text, SafeAreaView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import styles from "./Map.style";
import * as Location from "expo-location";
export default function Map() {
  // haritamızın bulunduğu sayfa.
  const [location, setLocation] = useState(null);

  useEffect(() => {
    currentLocation();
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
      <MapView style={styles.map}>
        {location ? (
          <Marker
            //marker kullanarak user profil fotoğrafını harita üzerinde gösteriyoruz.
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        ) : null}
      </MapView>
    </View>
  );
}
