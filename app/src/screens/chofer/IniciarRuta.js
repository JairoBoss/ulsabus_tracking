import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../utils/colors";
import { scaleWidth } from "../../utils/size";
import { getBusByChofer } from "../../services/camionService";
import CamionItem from "./CamionItem";

export default function IniciarRuta({ navigation }) {
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { camiones, fetched } = useSelector((state) => state.camiones);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const getCamiones = () => {
    dispatch(getBusByChofer(currentUser?.id));
    console.log(camiones);
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(false);
      getCamiones();
    }
    return () => {
      setLoading(true);
    };
  }, [isFocused]);

  return (
    <View style={{ backgroundColor: Colors.pageBackGround }}>
      {loading ? null : (
        <>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/4635/4635340.png",
                }}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Nombre{" "}
                <Text style={styles.textBold}>
                  {currentUser?.name} {currentUser?.last_name}
                </Text>
              </Text>
              <Text style={styles.text}>
                Licencia no: {currentUser?.no_licencia}
              </Text>
            </View>
          </View>
          <View>
            {!fetched ? null : (
              <>
                <Text />
                <CamionItem
                  data={camiones?.dataWithImageUrl[0]}
                  navigate={navigation.navigate}
                />
                <CamionItem
                  data={camiones?.dataWithImageUrl[0]}
                  navigate={navigation.navigate}
                />
                <CamionItem
                  data={camiones?.dataWithImageUrl[0]}
                  navigate={navigation.navigate}
                />
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 25,
    padding: 10,
    borderRadius: scaleWidth(8),
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 25,
    marginLeft: 10,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  textBold: {
    fontWeight: "400",
  },
});
