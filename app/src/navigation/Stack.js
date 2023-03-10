import { createStackNavigator } from "@react-navigation/stack";
import DetallesCamion, {
  DetallesCamionScreen,
} from "../screens/DetallesCamion";
import Settings from "../screens/Settings";

import BottomTabNavigator from "./BottomTab";

const StackNavigator = createStackNavigator();

export default function Stack() {
  return (
    <StackNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
        presentation: "transparentModal",
        // gestureEnabled: true,
        keyboardHandlingEnabled: true,
      }}
    >
      <StackNavigator.Screen
        name="Root"
        component={BottomTabNavigator}
        // options={{
        //   header: ({ navigation, route, options, back }) => (
        //     <Header title={route.name} />
        //   ),
        // }}
      />
      <StackNavigator.Group screenOptions={{ headerShown: true }}>
        <StackNavigator.Screen
          name="DetallesCamion"
          component={DetallesCamion}
          options={DetallesCamionScreen}
        />
        <StackNavigator.Screen name="Settings" component={Settings} />
      </StackNavigator.Group>
    </StackNavigator.Navigator>
  );
}
