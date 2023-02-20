import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Color";

export default function Input({ label, value, onChangeText, secureTextEntry }) {
  return (
    <View style={style.container}>
      <TextInput
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "90%",
    height: 45,
    justifyContent: "center",
    margin: 10,
    padding: 10,
    backgroundColor: Colors.ligth,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  input: {},
});
