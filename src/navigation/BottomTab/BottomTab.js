import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../../screens/Main/Home/Home";
import Map from "../../screens/Main/Map/Map";
import Profile from "../../screens/Main/Profile/Profile";

import TabBar from "../../components/TabBar/TabBar";
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Tab.Screen options={{ headerShown: false }} name="Map" component={Map} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTab;
