import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  mapContainer: {},
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").height / 1.6,
    backgroundColor: "#00000070",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 20,
    alignItems: "center",
  },
  modalImage: {
    marginTop: 50,
    width: 300,
    height: 300,
    resizeMode: "stretch",
    borderRadius: 150,
  },
  modalTextContainer: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  modalText: {
    fontSize: 16,
    paddingHorizontal: 60,
    paddingVertical: 10,
  },
});
