import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBuses } from "../services/camionService";
import { useIsFocused } from "@react-navigation/native";
import CamionItem from "../components/CamionItem";
import { scaleHeight, scaleWidth } from "../utils/size";
import Colors from "../utils/colors";
import { ScaledSheet } from "react-native-size-matters";
import { getStatusBarHeight } from "../utils/StatusBar";
import FONTS from "../utils/fonts";
import CamionSkeleton from "../components/CamionSkeleton";

export default function Camiones({ navigation }) {
  const dispatch = useDispatch();
  const { camiones, fetched } = useSelector((state) => state.camiones);
  const isFocused = useIsFocused();

  const getCamiones = () => {
    dispatch(getAllBuses());
  };

  useEffect(() => {
    if (isFocused) {
    }
    getCamiones();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {!fetched ? null : (
        <>
          <Text />
          <CamionItem data={camiones.dataWithImageUrl[0]} />
          <CamionItem data={camiones.dataWithImageUrl[0]} />
          <CamionItem data={camiones.dataWithImageUrl[0]} />
        </>
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBackGround,
    paddingRight: scaleWidth(24),
  },
  contentContainerStyle: {
    paddingTop:
      Platform.OS === "ios"
        ? getStatusBarHeight() + scaleHeight(130)
        : scaleHeight(130),
    paddingBottom: scaleHeight(84),
  },
  txtTitleAlert: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: "500",
    fontSize: scaleHeight(18),
    lineHeight: scaleHeight(29),
    color: Colors.semiBlack,
  },
  dialogStyle: {
    width: scaleWidth(340),
    height: scaleHeight(190),
    borderRadius: scaleWidth(16),
    overflow: "hidden",
    backgroundColor: Colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: scaleHeight(25),
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.1,
  },
  messageStyle: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(16),
    lineHeight: scaleHeight(24),
    color: Colors.dimGray,
    textAlign: "center",
    marginHorizontal: scaleWidth(50),
  },
  txtPositiveButton: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(14),
    color: Colors.classicBlue,
    textAlign: "center",
  },
  txtNegativeButton: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(14),
    color: Colors.white,
    textAlign: "center",
  },
  negativeButton: {
    backgroundColor: Colors.classicBlue,
    height: scaleHeight(55),
    justifyContent: "center",
    alignItems: "center",
  },
  positiveButton: {
    backgroundColor: Colors.white,
    height: scaleHeight(55),
  },
});
