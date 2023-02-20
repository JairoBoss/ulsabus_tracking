import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Button } from "react-native";
import { globalStyle } from "../styles/Global";


export default function Ayuda() {
  return (
    <View style={globalStyle.screenContainer}>
      <Text style={globalStyle.title}>Ayuda</Text>
      
      <StatusBar style="auto" />
    </View>
  );
}
