import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    justifyContent: "center",
    flex: 0.2,
    backgroundColor: "#f7f600",
  },
  logo: {
    fontSize: 110,
    color: "black",
    textAlign: "center",
  },
  content: {
    flex: 0.75,
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    top: -20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 30,
    justifyContent: "center",
  },
  title: {
    marginVertical: 30,
    textAlign: "center",
    fontSize: 34,
    color: "#000",
    fontWeight: "700",
  },
  text: {
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 20,
    fontSize: 18,
    color: "#a7abb1",
  },
  createAccount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#38beff",
    marginTop: 25,
    textAlign: "center",
  },
});
