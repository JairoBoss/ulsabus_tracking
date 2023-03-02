import React from "react";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import { TouchableOpacity, StyleSheet, View } from "react-native";

export default function StartScreen({ navigation }) {
  return (
    // <Background>
    <View style={{ backgroundColor: "#f9f9f1", flex: 1 }}>
      <View
        style={{
          flex: 1,
          // padding: 20,
          width: "100%",
          maxWidth: 340,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo />
        <Header>BusSafe</Header>
        <Paragraph>
          App para monitorear el ulsabus {"\n"}informacion de las rutas y
          camiones.
        </Paragraph>
        <Button mode="contained" onPress={() => navigation.navigate("Login")}>
          Login
        </Button>
      </View>
    </View>
    // </Background>
  );
}
