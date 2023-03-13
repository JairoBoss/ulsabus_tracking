import React, { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { View, Text, StyleSheet, Platform, Image } from "react-native";
import { useSocket } from "../../hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoordenadas } from "../../services/coordenadas";
import { getAllEstaciones } from "../../services/estaciones";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  MAP_TYPES,
  Polyline,
} from "react-native-maps";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ScaledSheet } from "react-native-size-matters";
import Colors from "../../utils/colors";
import { scaleHeight, scaleWidth } from "../../utils/size";
import FONTS from "../../utils/fonts";
import SvgUserLocation from "../../svgs/SvgUserLocation";

export default function DetallesRuta({ route }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const { coordenadas } = useSelector((state) => state.coordenadas);
  const { paradas } = useSelector((state) => state.estaciones);
  const { socket, online } = useSocket(`rutaxd`);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = ["15%", "50%"];

  useEffect(() => {
    dispatch(getAllCoordenadas(id));
    dispatch(getAllEstaciones(id));
    getLocation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (latitude && longitude) {
        socket.emit("ruta", {
          id,
          latitude,
          longitude,
        });
      }
    // }, 1000);
    }, 500);
    // Limpiar el intervalo cuando se desmonta el componente
    return () => clearInterval(interval);
  }, [latitude, longitude]);

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Error, tienes que aceptar el permiso de ubicacion");
      return;
    }
    let location = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        // distanceInterval: 10,
        distanceInterval: 1,
      },
      (location) => {
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      }
    );
  }

  const mapStyle = [
    {
      featureType: "poi.business",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
          color: "#c8c8c8",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#feffff",
        },
      ],
    },
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#e6e9f0",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#f2f3f7",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#646369",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#80ccf2",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          // color: "#bce5c3",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#a5afce",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#8597b5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#bce5c3",
        },
      ],
    },
  ];

  return (
    <>
      <MapView
        showsUserLocation={false}
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
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
        zIndex={-1}
        customMapStyle={mapStyle}
        maxZoomLevel={17}
        minZoomLevel={12}

        // minZoomLevel={16}
      >
        <Polyline
          coordinates={coordenadas}
          strokeColor="#030507"
          strokeWidth={5}
        />
        {paradas.map((coordenadas) => (
          <Marker coordinate={coordenadas} tracksViewChanges={false}>
            <SvgUserLocation />
          </Marker>
        ))}

        {latitude && longitude ? (
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
            tracksViewChanges={true}
            style={{ width: 50, height: 50 }}
          >
            <Image
              source={{
                uri: "https://cdna.artstation.com/p/assets/images/images/049/038/526/original/psfic-bus.gif?1651550600",
              }}
              style={{ flex: 1, width: 50, height: 50 }}
            />
          </Marker>
        ) : null}
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        initialSnapIndex={0}
        zIndex={1}
      >
        <BottomSheetScrollView
          snapPoints={["50%", "80%"]}
          initialSnap={0}
        ></BottomSheetScrollView>
      </BottomSheet>
    </>
  );
}

function DetallesRutaScreen({ route }) {
  const { data } = route.params;

  return {
    headerTitle: `${data.ruta.nombre}`,
  };
}

export { DetallesRutaScreen };

const styles = ScaledSheet.create({
  bottomSheet: {
    backgroundColor: Colors.pageBackGround,
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
    paddingLeft: scaleWidth(5),
    paddingRight: scaleWidth(5),
    paddingBottom: scaleHeight(5),
    justifyContent: "flex-end",
    // paddingTop: scaleHeight(1),
    // marginTop: "3%",
    backgroundColor: Colors.white,
    borderRadius: scaleWidth(16),
    // marginHorizontal: scaleWidth(16),
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
