import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SettingsScreen from "../screens/SettingsScreen";
import Group from "../screens/Group";
import Icon from "react-native-vector-icons/MaterialIcons";
import Profile from "../screens/Profile";

const Tab = createMaterialBottomTabNavigator();


const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        headerShown: false,
        // tabBarColor: "#FF8F8F",
      }}
      activeColor="#fff"
      inactiveColor="#333"
      barStyle={{ backgroundColor: "#FF8F8F" }}
      keyboardHidesNavigationBar
      sceneAnimationEnabled
      sceneAnimationType="shifting"
    >
      <Tab.Screen
        name="Group"
        component={Group}
        tabBarBadge
        options={{
          tabBarBadge: 1,
          tabBarIcon: () => <Icon name="groups" size={24} color="#333" />,
        }}
      />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => <Icon name="person" size={24} color="#333" />,
          }}
        />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: () => <Icon name="settings" size={24} color="#333" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
