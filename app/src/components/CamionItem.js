import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { scaleHeight, scaleWidth } from "../utils/size";
import FONTS from "../utils/fonts";
import Colors from "../utils/colors";
import ButtonPrimary from "./ButtonPrimary";
import SvgLocation from "../svgs/SvgLocation";
import { useNavigation } from "@react-navigation/native";

export default function CamionItem({ data }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.navigate("DetallesCamion", { data })}
      style={[styles.doctorItem]}
    >
      <Image style={styles.imgDoctor} source={{ uri: data.imageUrl }} />
      <View style={styles.rateView}>
        <Text style={styles.txtDoctorName}>{data.ruta.nombre}</Text>
        <Text style={styles.txtSpecialized}>Placas: {data.placas}</Text>
      </View>
      <Text style={styles.txtSpecialized}>Disponible o no</Text>
      <TouchableOpacity
        onPress={() => console.log("first")}
        activeOpacity={0.6}
        style={styles.locationView}
      >
        <SvgLocation color={Colors.dimGray} />
        <Text style={styles.txtLocation}> Ultima parada</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  doctorItem: {
    paddingVertical: scaleHeight(16),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(8),
    paddingLeft: scaleWidth(88),
    paddingRight: scaleWidth(16),
    // height: scaleHeight(141),
    width: scaleWidth(327),
    marginBottom: scaleHeight(16),
    marginLeft: scaleWidth(24),
  },
  imgDoctor: {
    width: scaleWidth(50),
    height: scaleWidth(56),
    borderRadius: scaleWidth(26),
    overflow: "hidden",
    position: "absolute",
    // top: scaleHeight(30),
    top: "35%",
    left: scaleWidth(16),
  },
  txtDoctorName: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(16),
    lineHeight: scaleHeight(24),
    fontWeight: "500",
    color: Colors.semiBlack,
    // textTransform: "uppercase",
  },
  txtSpecialized: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(12),
    lineHeight: scaleHeight(16),
    fontWeight: "500",
    color: Colors.silverChalice,
    marginTop: scaleHeight(4),
    marginBottom: scaleHeight(4),
  },
  locationView: {
    flexDirection: "row",
    height: scaleHeight(26),
  },
  txtLocation: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(14),
    lineHeight: scaleHeight(20),
    color: Colors.brown,
    // marginBottom: scaleHeight(6),
    // marginTop: "-1%",
    marginLeft: scaleWidth(4),
  },
  txtRating: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(14),
    lineHeight: scaleHeight(21),
    color: Colors.orange,
  },
  rateView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: scaleWidth(-1),
  },
  svgStart: {
    marginBottom: scaleHeight(1),
    marginRight: scaleWidth(5),
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnCall: {
    width: scaleWidth(104),
    height: scaleHeight(32),
    backgroundColor: Colors.pageBackGround,
  },
  txtBtnCall: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: "400",
    textTransform: "capitalize",
    color: Colors.silverChalice,
    fontSize: scaleHeight(14),
  },
  btnMessage: {
    fontSize: scaleHeight(14),
    width: scaleWidth(103),
    height: scaleHeight(32),
    backgroundColor: Colors.secondBlueOpacity,
  },
  txtBtnMessage: {
    fontWeight: "500",
    textTransform: "capitalize",
    color: Colors.secondBlue,
    fontSize: scaleHeight(14),
  },
  btnDeleteView: {
    flex: 1,
    backgroundColor: Colors.secondRed,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    width: scaleWidth(96),
    height: scaleHeight(141),
  },
});
