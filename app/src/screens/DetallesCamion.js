import React, { useMemo, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Colors from "../utils/colors";
import { scaleHeight, scaleWidth } from "../utils/size";
import FONTS from "../utils/fonts";
import TopicItem from "../components/TopicItem";
import SvgDelete from "../svgs/SvgDelete";
import SvgUserLocation from "../svgs/SvgUserLocation";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  MAP_TYPES,
  Polyline,
} from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";

export const eventLocation = [
  {
    id: 0,
    coordinate: { latitude: 37.78025, longitude: -122.434 },
  },
  {
    id: 1,
    coordinate: { latitude: 37.78925, longitude: -122.4364 },
  },
  {
    id: 2,
    coordinate: { latitude: 37.78425, longitude: -122.4314 },
  },
  {
    id: 3,
    coordinate: { latitude: 37.78489, longitude: -122.4394 },
  },
  {
    id: 4,
    coordinate: { latitude: 37.7925, longitude: -122.4304 },
  },
];

const eventLocationLine = [
  { latitude: 17.02287727472495, longitude: -96.72994673252107 },
  { latitude: 17.02222071141928, longitude: -96.72951757907869 },
  { latitude: 17.019917592237615, longitude: -96.72841250896455 },
];

export const initialLatitudeDelta = 0.01202;
export const initialLongitudeDelta = 0.00081;

export default function DetallesCamion({ route }) {
  const { data } = route.params;
  const bottomSheetRef = useRef(null);
  const snapPoints = ["1%", "50%", "100%"];

  const region = useMemo(
    () => ({
      ...eventLocation[3].coordinate,
      latitudeDelta: initialLatitudeDelta,
      longitudeDelta: initialLatitudeDelta,
    }),
    []
  );

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerView}>
        <View style={styles.header}>
          <View style={styles.setRow}>
            <Text style={styles.doctorName}>{data.ruta.nombre}</Text>

            <View style={styles.rateView}>
              <Text style={styles.specialized}>Placas: {data.placas}</Text>
            </View>
            <Text style={styles.txtTitle}>
              Ultima estacion: {"{parada.nombre}"}
            </Text>
          </View>
          <Image style={styles.imgDoctor} source={{ uri: data.imageUrl }} />
        </View>
        {/* <View style={styles.buttonsView}></View> */}
      </View>

      <View style={styles.mapaContainer}>
        <Text></Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapView}
          showsUserLocation={true}
          region={{
            latitude: 17.0262,
            longitude: -96.7327,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          mapType={MAP_TYPES.STANDARD}
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsTraffic={false}
        >
          <Polyline
            coordinates={eventLocationLine}
            strokeColor="#F00"
            strokeWidth={3}
          />
          <Marker
            coordinate={eventLocation[3].coordinate}
            tracksViewChanges={false}
          >
            <SvgUserLocation />
          </Marker>
        </MapView>
      </View>

      <TopicItem
        Svg={<SvgDelete width={18} height={20} color={Colors.secondRed} />}
        title={"Reportar"}
        onPress={() => console.log("Reportar")}
      />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        initialSnapIndex={0}
        enablePanDownToClose={true}
        zIndex={1}
      >
        <View style={styles.bottomSheet}>
          <Text>Contenido de la hoja inferior</Text>
        </View>
      </BottomSheet>
    </ScrollView>
  );
}

function DetallesCamionScreen({ route }) {
  const { data } = route.params;

  return {
    headerTitle: `${data.ruta.nombre}`,
  };
}

export { DetallesCamionScreen };

const styles = ScaledSheet.create({
  bottomSheet: {
    backgroundColor: "white",
    padding: 16,
    height: "100%",
  },
  mapaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(15),
    marginTop: scaleHeight(15),
    height: 500,
    // height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.pageBackGround,
    height: "100%",
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mapView: {
    width: "100%",
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  headerView: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: scaleWidth(24),
    borderBottomRightRadius: scaleWidth(24),
    paddingLeft: scaleWidth(15),
    paddingRight: scaleWidth(15),
    paddingBottom: scaleHeight(2),
    justifyContent: "flex-end",
    paddingTop: scaleHeight(3),
    marginTop: "3%",
    backgroundColor: Colors.white,
    borderRadius: scaleWidth(16),
    marginHorizontal: scaleWidth(16),
    paddingBottom: scaleHeight(3),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  doctorName: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(18),
    lineHeight: scaleHeight(24),
    color: Colors.semiBlack,
  },
  specialized: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(14),
    lineHeight: scaleHeight(20),
    color: Colors.silverChalice,
  },
  txtRating: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(14),
    lineHeight: scaleHeight(18),
    marginBottom: scaleHeight(-4),
    color: Colors.orange,
  },
  svgStart: {
    marginBottom: scaleHeight(5),
    marginLeft: scaleWidth(7),
    marginRight: scaleWidth(5),
  },
  rateView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(6),
    marginBottom: scaleHeight(11),
  },
  txtTitle: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(14),
    lineHeight: scaleHeight(20),
    color: Colors.dimGray,
    marginRight: scaleWidth(16),
  },
  imgDoctor: {
    width: scaleWidth(88),
    height: scaleHeight(128),
    borderRadius: scaleWidth(16),
    overflow: "hidden",
    // lineHeight: scaleHeight(24),
  },
  setRow: {
    width: scaleWidth(215),
  },
  buttonPrimary: {
    width: scaleWidth(191),
  },
  txtBtn: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(14),
    textTransform: "capitalize",
    fontWeight: "600",
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(26),
  },
  svgVideo: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(16),
    backgroundColor: Colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
  svgMessage: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(16),
    backgroundColor: Colors.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  svgBackArrow: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(16),
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: Platform.OS === "ios" ? getStatusBarHeight() : scaleHeight(12),
  },
  doctorServices: {
    backgroundColor: Colors.white,
    borderRadius: scaleWidth(16),
    marginHorizontal: scaleWidth(16),
    paddingBottom: scaleHeight(3),
    marginTop: scaleHeight(22),
    marginBottom: scaleHeight(23),
  },
  txtDoctorServices: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: "500",
    fontSize: scaleHeight(16),
    lineHeight: scaleHeight(24),
    textTransform: "uppercase",
    color: Colors.semiBlack,
  },
  svgArrowDown: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(16),
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: scaleWidth(22),
    paddingLeft: scaleWidth(16),
    paddingRight: scaleWidth(20),
    height: "45%",
    marginBottom: scaleHeight(16),
  },
  flexDirection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemView: {
    flexDirection: "row",
    paddingLeft: scaleWidth(16),
    flexWrap: "wrap",
  },
});
