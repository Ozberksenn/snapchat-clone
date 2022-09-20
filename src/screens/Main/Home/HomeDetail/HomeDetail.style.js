import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  homeDetailContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFD8A9",
  },
  title: {
    fontSize: 18,
    marginTop: 50,
    fontWeight: "bold",
  },
  image: {
    marginTop: 30,
    borderWidth: 2,
    borderRadius: 10,
    width: Dimensions.get("window").width / 1.1,
    height: Dimensions.get("window").height / 2,
    resizeMode: "stretch",
  },
});
