import React, { Profiler } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
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
import Camiones from "../screens/Camiones";
import DetallesCamion from "../screens/DetallesCamion";
import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const DrawerNavigation = createDrawerNavigator();

export default function Drawer() {
  return (
    <DrawerNavigation.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        drawerType: "slide",
      }}
      drawerContentOptions={{
        activeTintColor: "#1DA1F2",
        inactiveTintColor: "#FFF",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerNavigation.Screen
        name="Inicio"
        component={Stack}
        options={{ headerShown: false }}
      />
      {/* <DrawerNavigation.Screen name="Inicio" component={Inicio} /> */}
      <DrawerNavigation.Screen name="Profile" component={Profile} />
      <DrawerNavigation.Screen name="Rutas" component={Rutas} />
      <DrawerNavigation.Screen name="Horarios" component={Horarios} />
      <DrawerNavigation.Screen name="Privacidad" component={Privacidad} />
      <DrawerNavigation.Screen name="CerrarSesion" component={CerrarSesion} />
      {/* <DrawerNavigation.Screen name="Settings" component={Settings} /> */}
      {/* <DrawerNavigation.Screen name="DetallesCamion" component={DetallesCamion} /> */}
      {/* <DrawerNavigation.Screen name="Camiones" component={Camiones} /> */}
    </DrawerNavigation.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
        <View style={styles.drawerHeader}>
          <Image
            source={{
              uri: "https://avatarfiles.alphacoders.com/128/thumb-128984.png",
            }}
            style={styles.drawerImage}
          />
          <View style={styles.drawerTextContainer}>
            <Text style={styles.drawerName}>Jairo Esteban</Text>
            <Text style={styles.drawerEmail}>dev.jairo.mp@gmail.com</Text>
          </View>
        </View>
      </TouchableOpacity>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: "row",
    padding: 10,
  },
  drawerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  drawerTextContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  drawerName: {
    color: "#15202B",
    fontSize: 18,
    fontWeight: "bold",
  },
  drawerEmail: {
    color: "#15202B",
    fontSize: 14,
  },
});
