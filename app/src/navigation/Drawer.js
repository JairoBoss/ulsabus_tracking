import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ayuda from "../screens/Ayuda";
import Stack from "./Stack";

const DrawerNavigation = createDrawerNavigator();

export default function Drawer() {
  return (
    <DrawerNavigation.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        drawerType: 'slide'
      }}
    >
      <DrawerNavigation.Screen
        name="Stack"
        component={Stack}
        options={{ headerShown: false }}
      />
      <DrawerNavigation.Screen name="Ayuda" component={Ayuda} />
    </DrawerNavigation.Navigator>
  );
}
