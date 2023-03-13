import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Header from "../../components/Header";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import BackButton from "../../components/BackButton";
import { theme } from "../../core/theme";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/authService";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  // const [login, { isLoading, onError }] = useLoginMutation();

  const { isLoading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState({ value: "admin@gmail.com", error: "" });
  const [password, setPassword] = useState({ value: "A1b2c3", error: "" });

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    try {
      dispatch(login({ email: email.value, password: password.value }));
      
    } catch (error) {
      console.log(error);
      return showMessage({
        message: "Datos no válidos",
        type: "warning",
      });
    }
  };

  return (
    <View style={{ backgroundColor: "#F5F5F5", flex: 1 }}>
      <View
        style={{
          flex: 1,
          // padding: 20,
          width: "100%",
          maxWidth: 340,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: 'url("../../assets/background_dot.png")',
          resizeMode: "repeat",
        }}
      >
        <BackButton goBack={navigation.goBack} />
        {/* <Logo /> */}
        <Header>Bienvenido</Header>

        <View style={styles.row}>
          <Text>Inicia sesión</Text>
        </View>

        <TextInput
          label="Correo"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Contraseña"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgot}>Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={onLoginPressed} loading={isLoading}>
          Ingresar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
