import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./Stack";
import BottomTab from "./BottomTab";
import Drawer from "./Drawer";
import AuthStack from "./AuthStack";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { restoreToken } from "../features/authReducer";
import Splash from "../screens/Splash";
import { validateToken } from "../services/authService";
import ChoferStack from "./chofer/ChoferStack"
export default function RootNavigator() {
  const { userToken, loading, currentUser } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getValue();
  }, []);

  const getValue = async () => {
    dispatch(validateToken());
    try {
      const value = await AsyncStorage.getItem("@token");
      if (value !== null) {
        console.log("Informacion restaurada", value);
        dispatch(restoreToken(value));
      } else {
        dispatch(restoreToken(null));
      }
    } catch (error) {
      console.log({ error: error });
    }
    // console.log(currentUser?.roles.includes('chofer'));
  };

  if (loading) return <Splash />;

  if (currentUser?.roles.includes("chofer"))
    return (
      <NavigationContainer>
        <ChoferStack />
      </NavigationContainer>
    );

  return (
    <NavigationContainer>
      {userToken ? <Drawer /> : <AuthStack />}
    </NavigationContainer>
  );
}
