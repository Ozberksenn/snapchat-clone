import { StyleSheet } from "react-native";

export default StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  profilImageContainer: {
    alignItems: "center",
  },
  userName: {
    marginTop: 10,
    fontSize: 16,
  },
  profilImage: {
    borderWidth: 1,
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: "contain",
    marginTop: 30,
  },
  btnContainer: {
    marginRight: 50,
    backgroundColor: "#a05dcd",
    padding: 10,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnText: {
    fontSize: 24,
    color: "#fff",
  },
  icon: {
    fontSize: 26,
    color: "white",
  },
});
