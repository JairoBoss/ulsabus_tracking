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

export default function RootNavigator() {
  const { userToken, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getValue();
  }, []);

  const getValue = async () => {
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
  };

  if (loading) return <Splash />;

  return (
    <NavigationContainer>
      {userToken ? <Drawer /> : <AuthStack />}
    </NavigationContainer>
  );
}
