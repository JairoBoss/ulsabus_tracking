import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import RootNavigator from "./src/navigation/RootNavigator";
import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import FlashMessage from "react-native-flash-message";

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
      <FlashMessage position="top" /> 
    </Provider>
  );
}
