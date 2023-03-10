import { StyleSheet } from "react-native";
import { Colors } from "../constants/Color";

export const globalStyle = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.ligth,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.secondary,
  },
});
