import "react-native-gesture-handler";
import Constants from "expo-constants";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import RootNavigator from "./src/navigation/RootNavigator";
import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";

export default function App() {

  useEffect(() => {
    if (Platform.OS === "android") {
      // Define el color transparente de la barra de navegación inferior
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }
  }, []);

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
