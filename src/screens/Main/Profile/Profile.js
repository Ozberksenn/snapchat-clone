import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "./Profile.style";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Profile = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.profileContainer}>
      <View style={styles.profilImageContainer}>
        <Image
          style={styles.profilImage}
          source={{
            uri: "https://www.rpetru.com/wp-content/uploads/2022/03/r.petruccillo_dwight-schrute_oil-on-panel_6x6_2022.jpg",
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Theme")}
        style={styles.btnContainer}
      >
        <Text style={styles.btnText}>Theme</Text>
        <MaterialIcons style={styles.icon} name="keyboard-arrow-right" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("EditProfile")}
        style={styles.btnContainer}
      >
        <Text style={styles.btnText}>Edit Profile</Text>
        <MaterialIcons style={styles.icon} name="keyboard-arrow-right" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnContainer}>
        <Text style={styles.btnText}>Log Out</Text>
        <MaterialIcons style={styles.icon} name="keyboard-arrow-right" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
