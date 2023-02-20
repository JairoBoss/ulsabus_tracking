import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { globalStyle } from "../styles/Global";

export default function Splash() {
  return (
    <View style={globalStyle.screenContainer}>
      <Text style={globalStyle.title}>Hola!</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
