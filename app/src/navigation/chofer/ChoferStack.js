import { createStackNavigator } from "@react-navigation/stack";
import DetallesRuta, {
  DetallesRutaScreen,
} from "../../screens/chofer/DetallesRuta";
import IniciarRuta from "../../screens/chofer/IniciarRuta";

const StackNavigator = createStackNavigator();

export default function ChoferStack() {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        presentation: "transparentModal",
        keyboardHandlingEnabled: true,
      }}
    >
      <StackNavigator.Screen
        name="ChoferInicio"
        options={{ headerTitle: `Rutas` }}
        component={IniciarRuta}
      />
      <StackNavigator.Screen
        name="DetalleRuta"
        options={DetallesRutaScreen}
        component={DetallesRuta}
      />
    </StackNavigator.Navigator>
  );
}
