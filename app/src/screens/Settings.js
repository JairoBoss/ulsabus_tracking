import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { globalStyle } from "../styles/Global";

export default function Settings() {
  return (
    <View style={globalStyle.screenContainer}>
      <Text style={globalStyle.title}>Settings</Text>
      <StatusBar style="auto" />
    </View>
  );
}
