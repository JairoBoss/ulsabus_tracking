import { createStackNavigator } from "@react-navigation/stack";
import DetallesRuta from "../../screens/chofer/DetallesRuta";
import IniciarRuta from "../../screens/chofer/IniciarRuta";

const StackNavigator = createStackNavigator();

export default function ChoferStack() {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
        presentation: "transparentModal",
        keyboardHandlingEnabled: true,
      }}
    >
      <StackNavigator.Screen name="ChoferInicio" component={IniciarRuta} />
      <StackNavigator.Screen name="DetalleRuta" component={DetallesRuta} />
    </StackNavigator.Navigator>
  );
}
