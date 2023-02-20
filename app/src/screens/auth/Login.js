import React, { useState } from "react";
import { View, Text } from "react-native";
import { globalStyle } from "../../styles/Global";
import Input from "../../components/Input";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { signIn } from "../../features/auth/auth";
import { ScaledSheet } from "react-native-size-matters";
import TextInputHealer from "../../components/TextInputHealer";
import SvgUser from "../../svgs/SignIn/SvgUser";
import colors from "../../utils/colors";
import { scaleHeight, scaleWidth } from "../../utils/size";
import FONTS from "../../utils/fonts";
import { getBottomSpace } from 'react-native-iphone-x-helper';


export default function Login({ navigation }) {
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  const save = async (value) => {
    try {
      await AsyncStorage.setItem("@token", value);
      dispatch(signIn(value));
      console.log("Correo guardado");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={globalStyle.screenContainer}>
      <Text style={globalStyle.title}>Iniciar sesion</Text>
      <Input label={"Correo"} onChangeText={setToken} />
      <TextInputHealer
        svg={<SvgUser />}
        placeholder={"Username/Phonenumber"}
        // value={userName}
        returnKeyType={"next"}
        onSubmitEditing={() => {
          refInput2.current.focus();
        }}
        blurOnSubmit={false}
      />
      <Input label={"Contraseña"} secureTextEntry />
      <Button title={"Iniciar sesion"} onPress={() => save(token)} />
      <Button
        title={"Olvidaste contraseña?"}
        onPress={() => navigation.navigate("ForgotPassword")}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  svgHeart: {
    top:
      Platform.OS === "ios"
        ? getStatusBarHeight() + scaleHeight(32)
        : scaleHeight(32),
    left: scaleWidth(40),
  },
  txtWelcome: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(32),
    lineHeight: scaleHeight(48),
    color: colors.semiBlack,
    marginTop:
      Platform.OS === "ios"
        ? getStatusBarHeight() + scaleHeight(60)
        : scaleHeight(60),
    marginLeft: scaleWidth(40),
    marginBottom: scaleHeight(30),
  },
  txtInput2: {
    marginTop: scaleHeight(16),
    marginBottom: scaleHeight(24),
  },
  signIn: {
    width: scaleWidth(221),
    height: scaleHeight(48),
    backgroundColor: colors.classicBlue,
    color: colors.newBlack,
  },
  viewFaceId: {
    width: scaleWidth(48),
    height: scaleHeight(48),
    borderRadius: scaleHeight(16),
    backgroundColor: colors.classicBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  signInView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: scaleWidth(45),
    marginRight: scaleWidth(40),
  },
  forgotPasswordView: {
    marginTop: scaleHeight(20),
    alignSelf: "center",
    width: scaleWidth(200),
    height: scaleHeight(30),
    justifyContent: "center",
    alignItems: "center",
  },
  txtForgotPassword: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: "600",
    fontSize: scaleHeight(12),
    // color: colors.classicBlue,
    textTransform: "uppercase",
  },
  txtOr: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(16),
    color: colors.dimGray,
  },
  lineView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scaleWidth(40),
    alignItems: "center",
    marginTop: scaleHeight(25),
  },
  facebook: {
    width: scaleWidth(295),
    alignSelf: "center",
    marginTop: scaleHeight(15),
  },
  google: {
    width: scaleWidth(295),
    backgroundColor: colors.white,
    alignSelf: "center",
    marginTop: scaleHeight(24),
  },
  SignUpView: {
    position: "absolute",
    alignSelf: "center",
    width: scaleWidth(200),
    height: scaleHeight(30),
    justifyContent: "center",
    alignItems: "center",
    bottom: getBottomSpace() + scaleHeight(8),
  },
  txtSignUp: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: "600",
    fontSize: scaleHeight(12),
    color: colors.classicBlue,
    textTransform: "uppercase",
  },
});
