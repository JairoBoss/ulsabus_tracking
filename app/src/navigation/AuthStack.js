import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ForgotPassword from "../screens/auth/ForgotPassword";
import Login from "../screens/auth/Login";

const Auth = createStackNavigator();

export default function AuthStack() {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
    </Auth.Navigator>
  );
}
