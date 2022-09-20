import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "../Auth/Auth";
import BottomTab from "../BottomTab/BottomTab";
import Theme from "../../screens/Main/Profile/Theme/Theme";
import EditProfile from "../../screens/Main/Profile/EditProfile/EditProfile";
import HomeDetail from "../../screens/Main/Home/HomeDetail/HomeDetail";
const Stack = createNativeStackNavigator();

const Content = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="Theme" component={Theme} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="HomeDetail" component={HomeDetail} />
    </Stack.Navigator>
  );
};

export default Content;
