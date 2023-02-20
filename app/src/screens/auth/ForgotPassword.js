import { View, Text } from "react-native";
import React from "react";
import { globalStyle } from "../../styles/Global";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function ForgotPassword({ navigation }) {
  return (
    <View style={globalStyle.screenContainer}>
      <Text style={globalStyle.title}>Recuperar contraseña</Text>
      <Input label={"Correo"} />
      <Button title={"Enviar correo"} />
      <Button
        title={"Iniciar sesion?"}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}
