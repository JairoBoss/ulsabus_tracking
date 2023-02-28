import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

export default function InputForm({
  label,
  placeholder,
  secureTextEntry,
  ...props
}) {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text>{label}</Text>
      <TextInput
        style={styles.inputContainer}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        {...props.field}
      />
      {props.field.error && props.field.touched && (
        <Text style={styles.errorText}>{props.field.error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    marginVertical: 12,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  errorText: {
    marginBottom: 20,
    marginVertical: 12,
    color: "red",
    textAlign: "left",
  },
});


// const [token, setToken] = useState("");
// const dispatch = useDispatch();
// const [datos, setDatos] = useState({
//   email: "",
//   password: "",
// });
// const [login, { isLoading, data }] = useLoginMutation();

// const handleLogin = async () => {
//   try {
//     console.log("first");
//     const response = await login({
//       email: datos.email,
//       password: datos.password,
//     });
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// };

// if (isLoading) return <Splash />;

// const save = async (value) => {
//   try {
//     await AsyncStorage.setItem("@token", value);
//     dispatch(signIn(value));
//     console.log("Correo guardado");
//   } catch (error) {
//     console.log(error);
//   }
// };
