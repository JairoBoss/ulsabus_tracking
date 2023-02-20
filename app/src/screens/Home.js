import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Button } from "react-native";
import { globalStyle } from "../styles/Global";

export default function Home({ navigation }) {
  return (
    <View style={globalStyle.screenContainer}>
      <Text style={globalStyle.title}>Home</Text>
      <Button
        title="Configuracion"
        onPress={() => navigation.navigate("Settings")}
      />

      <Button
        title="Abrir drawer"
        onPress={() => navigation.openDrawer()}
      />
      <StatusBar style="auto" />
    </View>
  );
}
