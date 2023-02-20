import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../constants/Color";

export default function Header({ title }) {
  return (
    <View
      style={{
        height: 70,
        width: "100%",
        backgroundColor: Colors.secondary,
        padding: 10,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: Colors.ligth,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
