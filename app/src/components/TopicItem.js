import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { scaleHeight, scaleWidth } from "../utils/size";
import Colors from "../utils/colors";
import { ScaledSheet } from "react-native-size-matters";
import SvgRightArrow from "../svgs/SvgRightArrow";
import FONTS from "../utils/fonts";

export default function TopicItem(props) {
  const { Svg, title, onPress, style } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <View style={styles.svgView}>{Svg}</View>
      <Text style={styles.txtTitle}>{title}</Text>
      <SvgRightArrow style={styles.svg} />
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: scaleWidth(16),
    paddingLeft: scaleWidth(10),
    paddingVertical: scaleHeight(10),
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(16),
  },
  svgView: {
    width: scaleWidth(48),
    height: scaleWidth(48),
    borderRadius: scaleWidth(16),
    marginRight: scaleHeight(16),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.pageBackGround,
  },
  txtTitle: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(18),
    color: Colors.semiBlack,
  },
  svg: {
    position: "absolute",
    right: scaleWidth(21),
  },
});
