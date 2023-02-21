import React, { Profiler } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ayuda from "../screens/Ayuda";
import Stack from "./Stack";
import Privacidad from "../screens/Privacidad";
import Home from "../screens/Home";
import Inicio from "../screens/Inicio";
import Horarios from "../screens/Horarios";
import Rutas from "../screens/Rutas";
import Profile from "../screens/Profile";
import CerrarSesion from "../screens/CerrarSesion";
import Settings from "../screens/Settings";

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
      <DrawerNavigation.Screen name="Inicio" component={Inicio} />
      <DrawerNavigation.Screen name="Profile" component={Profile} />
      <DrawerNavigation.Screen name="Rutas" component={Rutas} />
      <DrawerNavigation.Screen name="Horarios" component={Horarios} />
      <DrawerNavigation.Screen name="Privacidad" component={Privacidad} />
      <DrawerNavigation.Screen name="CerrarSesion" component={CerrarSesion} />
      <DrawerNavigation.Screen name="Settings" component={Settings} />

    </DrawerNavigation.Navigator>
  );
}
