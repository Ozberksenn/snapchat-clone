import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "../Auth/Auth";
import BottomTab from "../BottomTab/BottomTab";
import Theme from "../../screens/Main/Profile/Theme/Theme";
import EditProfile from "../../screens/Main/Profile/EditProfile/EditProfile";
import HomeDetail from "../../screens/Main/Home/HomeDetail/HomeDetail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const Content = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [localData, setLocalData] = useState();

  const getLocal = async () => {
    const response = await AsyncStorage.getItem("userKey");
    const local = response ? JSON.parse(response) : null;
    console.log("merhaba ben localData", local);
    setLocalData(local);
  };
  useEffect(() => {
    getLocal();
  }, [userInfo]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!localData ? (
        <>
          <Stack.Screen name="Auth" component={Auth} />
        </>
      ) : (
        <>
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="Theme" component={Theme} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="HomeDetail" component={HomeDetail} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Content;
