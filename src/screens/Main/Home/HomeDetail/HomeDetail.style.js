import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  homeDetailContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2C3333",
  },
  title: {
    fontSize: 18,
    marginTop: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  imageContainer: {
    marginTop: 50,
    borderRadius: 50,
  },
  image: {
    width: Dimensions.get("window").width / 1.1,
    height: Dimensions.get("window").height / 2.5,
    borderWidth: 1,
    borderRadius: 30,
    resizeMode: "stretch",
  },
});
