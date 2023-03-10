import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../constants/Color";
import { Pressable } from "react-native";
import Rutas from "../screens/Rutas";
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Camiones from "../screens/Camiones";

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
            {/* <FontAwesome
              name="align-left"
              size={30}
              color={Colors.secondary}
              style={{ marginLeft: 15 }}
            /> */}
            <Entypo
              name="menu"
              size={30}
              style={{ marginLeft: 15 }}
              color="black"
            />
          </Pressable>
        ),
      }}
    >
      <BottomTabNavigator.Screen
        name="Rutas"
        component={Camiones}
        options={{
          tabBarIcon: ({ color, focused }) => (
            // <FontAwesome name="home" size={30} color={color} />
            <MaterialCommunityIcons name="bus-stop" size={44} color={color} />
          ),
        }}
      />

      <BottomTabNavigator.Screen
        name="Guardados"
        component={Rutas}
        options={{
          tabBarIcon: ({ color, focused }) => (
            // <FontAwesome name="bus" size={30} color={color} />
            <Foundation name="map" size={38} color={color} />
          ),
        }}
      />

      <BottomTabNavigator.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="bookmark" size={28} color={color} />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  );
}
