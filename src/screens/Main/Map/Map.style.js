import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  mapContainer: {},
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
