import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { globalStyle } from "../styles/Global";
import Button from "../components/Button";

import { useDispatch } from "react-redux";
import { signOut } from "../features/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const dispatch = useDispatch();

  return (
    <View style={globalStyle.screenContainer}>
      <Text style={globalStyle.title}>Profile</Text>
      <Button
        title={"Salir"}
        onPress={async () => {
          dispatch(signOut());
          await AsyncStorage.removeItem("@token");
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
