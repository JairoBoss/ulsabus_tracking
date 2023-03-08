import React, { useEffect, useMemo, useRef, useState } from "react";
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
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export const eventLocation = [
  {
    id: 0,
    coordinate: { latitude: 17.019876556449557, longitude: -96.72090768814088 },
  },
  {
    id: 1,
    coordinate: { latitude: 17.019876556449557, longitude: -96.72090768814088 },
  },
  {
    id: 2,
    coordinate: { latitude: 17.019876556449557, longitude: -96.72090768814088 },
  },
  {
    id: 3,
    coordinate: { latitude: 17.019876556449557, longitude: -96.72090768814088 },
  },
  {
    id: 4,
    coordinate: { latitude: 17.019876556449557, longitude: -96.72090768814088 },
  },
];

const eventLocationLine = [
  { latitude: 17.136197197023584, longitude: -96.77579633994826 },
  { latitude: 17.13504829172778, longitude: -96.78058077065535 },
  { latitude: 17.132422195808736, longitude: -96.77890729265019 },
  { latitude: 17.120132394546605, longitude: -96.76704276269047 },
  { latitude: 17.122143135468516, longitude: -96.76431799722052 },
  { latitude: 17.11966048281354, longitude: -96.76219396744473 },
  { latitude: 17.117781805959524, longitude: -96.76069041006271 },
  { latitude: 17.115914646334566, longitude: -96.7591134788655 },
  { latitude: 17.113031797148647, longitude: -96.75683926516619 },
  { latitude: 17.097036815706723, longitude: -96.74994153210642 },
  { latitude: 17.08228204863036, longitude: -96.74353726050975 },
  { latitude: 17.080055393342043, longitude: -96.74347289597108 },
  { latitude: 17.076094549100116, longitude: -96.74129522907973 },
  { latitude: 17.075950889956154, longitude: -96.7409412241171 },
  { latitude: 17.075448082080968, longitude: -96.74082322246288 },
  { latitude: 17.072461991060308, longitude: -96.73863482814842 },
  { latitude: 17.069280879318853, longitude: -96.73718662602857 },
  { latitude: 17.065925260739633, longitude: -96.73515914306077 },
  { latitude: 17.06427308386037, longitude: -96.73383967001824 },
  { latitude: 17.063452120966005, longitude: -96.7327025631686 },
  { latitude: 17.062867182701005, longitude: -96.72944142654312 },
  { latitude: 17.056443003270847, longitude: -96.73064289793146 },
  { latitude: 17.052933214444092, longitude: -96.72946288138935 },
  { latitude: 17.050788311027148, longitude: -96.72878705373341 },
  { latitude: 17.050039128432335, longitude: -96.72899087477252 },
  { latitude: 17.049115474522647, longitude: -96.73135090785672 },
  { latitude: 17.045256604358443, longitude: -96.73075017216257 },
  { latitude: 17.041921080569743, longitude: -96.72938778942759 },
  { latitude: 17.036645699901516, longitude: -96.728454503617 },
  { latitude: 17.022830476527602, longitude: -96.73016016389147 },
  { latitude: 17.019649417608175, longitude: -96.7282678279281 },
  { latitude: 17.019320954477813, longitude: -96.72659434992293 },
  { latitude: 17.019505715059566, longitude: -96.72584343030523 },
  { latitude: 17.018622968412053, longitude: -96.72131645775278 },
  { latitude: 17.019156722696493, longitude: -96.72226047098646 },
  { latitude: 17.021291724613803, longitude: -96.72180991921584 },
  { latitude: 17.02159965557304, longitude: -96.72324739391259 },
];

export const initialLatitudeDelta = 0.01202;
export const initialLongitudeDelta = 0.00081;

export default function DetallesCamion({ route }) {
  const { data } = route.params;
  const [coordenadas, setCoordenadas] = useState({
    latitude: 17.022851627764066,
    longitude: -96.72989845275879,
  });
  const bottomSheetRef = useRef(null);
  const snapPoints = ["15%", "50%",];

  useEffect(() => {
    let valor = 0;
    let mayor = true;
    const timer = setInterval(() => {
      if (mayor) {
        valor++;
        setCoordenadas(busCoordinates[valor].coordinate);
        if (valor == 10) {
          mayor = false;
        }
      }
      if (!mayor) {
        valor--;
        setCoordenadas(busCoordinates[valor].coordinate);
        if (valor == 0) {
          mayor = true;
        }
      }
    }, 1000); // Cambiar cada segundo

    return () => clearInterval(timer);
  }, []);

  const region = useMemo(
    () => ({
      ...eventLocation[3].coordinate,
      latitudeDelta: initialLatitudeDelta,
      longitudeDelta: initialLatitudeDelta,
    }),
    []
  );

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

  const busCoordinates = [
    {
      id: 0,
      coordinate: {
        latitude: 17.022851627764066,
        longitude: -96.72989845275879,
      },
    },
    {
      id: 1,
      coordinate: {
        latitude: 17.022666969541845,
        longitude: 96.72979116439821,
      },
    },
    {
      id: 2,
      coordinate: {
        latitude: 17.022513087550834,
        longitude: -96.72971606254579,
      },
    },
    {
      id: 3,
      coordinate: {
        latitude: 17.022205323189176,
        longitude: -96.72953903675081,
      },
    },
    {
      id: 4,
      coordinate: {
        latitude: 17.02201040549835,
        longitude: -96.72944247722627,
      },
    },
    {
      id: 5,
      coordinate: {
        latitude: 17.02167699318817,
        longitude: -96.72927081584932,
      },
    },
    {
      id: 6,
      coordinate: {
        latitude: 17.02134358028401,
        longitude: -96.72912597656251,
      },
    },
    {
      id: 7,
      coordinate: {
        latitude: 17.021015296228814,
        longitude: -96.72897577285768,
      },
    },
    {
      id: 8,
      coordinate: {
        latitude: 17.020717788306428,
        longitude: -96.72882556915283,
      },
    },
    {
      id: 9,
      coordinate: {
        latitude: 17.02032794962333,
        longitude: -96.7286002635956,
      },
    },
    {
      id: 10,
      coordinate: {
        latitude: 17.019968886960022,
        longitude: -96.72845005989076,
      },
    },
  ];

  return (
    <>
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
        zIndex={-1}
        customMapStyle={mapStyle}
        maxZoomLevel={17}
        minZoomLevel={12}

        // minZoomLevel={16}
      >
        <Polyline
          coordinates={eventLocationLine}
          strokeColor="#030507"
          strokeWidth={5}
        />
        <Marker
          coordinate={eventLocation[3].coordinate}
          tracksViewChanges={false}
        >
          <SvgUserLocation />
        </Marker>
        <Marker
          coordinate={eventLocation[3].coordinate}
          tracksViewChanges={true}
          style={{ width: 50, height: 50 }}
        >
          <Image
            source={{
              uri: "https://cdni.iconscout.com/illustration/premium/thumb/school-3862334-3213885.png",
            }}
            style={{ flex: 1, width: 50, height: 50 }}
          />
        </Marker>

        <Marker
          coordinate={coordenadas}
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
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        initialSnapIndex={0}
        zIndex={1}
      >
        <BottomSheetScrollView snapPoints={["50%", "80%"]} initialSnap={0}>
        <View style={styles.bottomSheet}>
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
          <Text />
          <View style={styles.headerView}>
            <View style={styles.header}>
              <View
                style={{
                  margin: "2%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{
                      uri: "https://avatarfiles.alphacoders.com/128/thumb-128984.png",
                    }}
                    style={{
                      width: 50,
                      height: 50,
                      marginRight: 10,
                      borderRadius: 25,
                      marginRight: "5%",
                      marginLeft: "6%",
                    }}
                  />
                  <View>
                    <Text style={{ fontWeight: "bold" }}>
                      Jairo Esteban Martinez.
                    </Text>
                    <Text>18 anos</Text>
                  </View>
                </View>
                <View>
                  <Text>5 estrellas</Text>
                  <Text>80 viajes</Text>
                </View>
              </View>
            </View>
            {/* <View style={styles.buttonsView}></View> */}
          </View>
          <Text />
          <TopicItem
            Svg={<SvgDelete width={18} height={20} color={Colors.secondRed} />}
            title={"Reportar"}
            onPress={() => console.log("Reportar")}
          />
        </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </>
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
