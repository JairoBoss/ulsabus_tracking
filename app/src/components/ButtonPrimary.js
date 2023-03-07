import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import FONTS from "../utils/fonts";
import { scaleHeight } from "../utils/size";
import Colors from "../utils/colors";

export default function ButtonPrimary(props) {
  return (
    <TouchableOpacity
      disable={props.disable}
      activeOpacity={props.disable ? 1 : 0.7}
      onPress={props.onPress}
      style={[styles.buttonPrimacy, props.style]}
    >
      <Text style={[styles.txtTitle, props.titleStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
  buttonPrimacy: {
    height: scaleHeight(48),
    borderRadius: scaleHeight(24),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.classicBlue,
  },
  txtTitle: {
    fontFamily: FONTS.HIND.Bold,
    fontSize: scaleHeight(16),
    textTransform: "uppercase",
    color: Colors.white,
  },
});
