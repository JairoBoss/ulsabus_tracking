import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Profile from "../screens/Profile";

import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../constants/Color";
import { Pressable } from "react-native";

const BottomTabNavigator = createBottomTabNavigator();

export default function BottomTab({ navigation }) {
  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        presentation: "transparentModal",
        // gestureEnabled: true,
        keyboardHandlingEnabled: true,
        tabBarActiveTintColor: Colors.secondary,
        tabBarShowLabel: false,
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <FontAwesome
              name="align-left"
              size={30}
              color={Colors.secondary}
              style={{ marginLeft: 15 }}
              size={28}
            />
          </Pressable>
        ),
      }}
    >
      <BottomTabNavigator.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="home" size={30} color={color} />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user" size={28} color={color} />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  );
}
